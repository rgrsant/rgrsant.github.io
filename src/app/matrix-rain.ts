import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { prefersReducedMotion } from './motion';

// Caracteres da chuva: katakana de meia largura (como no filme) e dígitos.
const GLYPHS = Array.from({ length: 0xff9d - 0xff66 + 1 }, (_, i) => String.fromCharCode(0xff66 + i))
  .concat('0123456789'.split(''));

const FONT_SIZE = 16;
const FRAME_MS = 1000 / 24; // 24 quadros por segundo dão o ritmo "de cinema"

/** Interface comum ao motor em WebAssembly e ao reserva em JavaScript. */
interface RainEngine {
  init(cols: number, rows: number, seed: number, glyphs: number): void;
  step(): void;
  drops(): Float32Array;
  glyphs(): Uint16Array;
}

async function loadWasmEngine(): Promise<RainEngine> {
  const url = new URL('rain.wasm', document.baseURI);
  const imports = { env: { abort: () => { throw new Error('rain.wasm abort'); } } };
  const { instance } = await WebAssembly.instantiateStreaming(fetch(url), imports).catch(async () =>
    WebAssembly.instantiate(await (await fetch(url)).arrayBuffer(), imports),
  );
  const e = instance.exports as unknown as {
    memory: WebAssembly.Memory;
    init(c: number, r: number, s: number, g: number): void;
    step(): void;
    dropsOffset(): number;
    glyphsOffset(): number;
  };
  let cols = 0;
  return {
    init(c, r, s, g) {
      cols = c;
      e.init(c, r, s, g);
    },
    step: () => e.step(),
    // A memória pode crescer, então recriamos as "janelas" a cada leitura.
    drops: () => new Float32Array(e.memory.buffer, e.dropsOffset(), cols),
    glyphs: () => new Uint16Array(e.memory.buffer, e.glyphsOffset(), cols),
  };
}

/** Mesmo algoritmo em JS puro, usado se o navegador bloquear o WebAssembly. */
function jsEngine(): RainEngine {
  let drops = new Float32Array(0);
  let speeds = new Float32Array(0);
  let glyphs = new Uint16Array(0);
  let rows = 0;
  let count = 1;
  return {
    init(c, r, _s, g) {
      rows = r;
      count = g;
      drops = new Float32Array(c).map(() => -Math.random() * r);
      speeds = new Float32Array(c).map(() => 0.35 + Math.random() * 0.65);
      glyphs = new Uint16Array(c);
    },
    step() {
      for (let i = 0; i < drops.length; i++) {
        let y = drops[i] + speeds[i];
        if (y > rows && Math.random() > 0.96) {
          y = -Math.random() * 8;
          speeds[i] = 0.35 + Math.random() * 0.65;
        }
        drops[i] = y;
        glyphs[i] = Math.floor(Math.random() * count);
      }
    },
    drops: () => drops,
    glyphs: () => glyphs,
  };
}

@Component({
  selector: 'app-matrix-rain',
  template: '<canvas #canvas aria-hidden="true"></canvas>',
  styleUrl: './matrix-rain.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixRain {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // afterNextRender só roda no navegador, nunca no prerender do build.
    afterNextRender(() => {
      if (prefersReducedMotion()) return;
      void this.start();
    });
  }

  private async start(): Promise<void> {
    let engine: RainEngine;
    try {
      engine = await loadWasmEngine();
      this.host.nativeElement.dataset['engine'] = 'wasm';
    } catch {
      engine = jsEngine();
      this.host.nativeElement.dataset['engine'] = 'js';
    }

    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cols = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px "MS Gothic", "Noto Sans Mono CJK JP", monospace`;
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#020a05';
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      cols = Math.ceil(innerWidth / FONT_SIZE);
      engine.init(cols, Math.ceil(innerHeight / FONT_SIZE), (Math.random() * 2 ** 32) >>> 0, GLYPHS.length);
    };

    // Ao rolar a página, a chuva some aos poucos para não brigar com o texto.
    const fade = () => {
      const t = Math.min(scrollY / innerHeight, 1);
      canvas.style.opacity = String(0.45 - t * 0.3);
    };

    let raf = 0;
    let last = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < FRAME_MS) return;
      last = now;

      engine.step();
      const drops = engine.drops();
      const glyphs = engine.glyphs();

      ctx.fillStyle = 'rgba(2, 10, 5, 0.14)'; // apaga devagar: é isso que cria o rastro
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < cols; i++) {
        const y = Math.floor(drops[i]);
        if (y < 0) continue;
        const ch = GLYPHS[glyphs[i]];
        ctx.fillStyle = '#2fd57a';
        ctx.fillText(ch, i * FONT_SIZE, (y - 1) * FONT_SIZE);
        ctx.fillStyle = '#d8ffe8'; // a "cabeça" da coluna brilha mais
        ctx.fillText(ch, i * FONT_SIZE, y * FONT_SIZE);
      }
    };

    resize();
    fade();
    addEventListener('resize', resize);
    addEventListener('scroll', fade, { passive: true });
    raf = requestAnimationFrame(frame);

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('scroll', fade);
    });
  }
}
