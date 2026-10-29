import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { prefersReducedMotion } from './motion';

const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@*+=<>/';

/**
 * Efeito "decifrando": o texto começa embaralhado e cada letra se fixa da
 * esquerda para a direita. Use appDecrypt="load" (ao abrir) ou "view" (ao
 * aparecer na tela).
 */
@Directive({ selector: '[appDecrypt]' })
export class Decrypt {
  readonly when = input<'load' | 'view' | ''>('load', { alias: 'appDecrypt' });
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      const finalText = this.el.textContent ?? '';
      this.el.setAttribute('aria-label', finalText.trim());
      if (prefersReducedMotion()) return;

      if (this.when() === 'view' && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            io.disconnect();
            this.run(finalText);
          }
        }, { threshold: 0.6 });
        io.observe(this.el);
      } else {
        this.run(finalText);
      }
    });
  }

  private run(finalText: string): void {
    const chars = [...finalText];
    const perChar = 900 / Math.max(chars.length, 1);
    const start = performance.now();
    const tick = (now: number) => {
      const fixed = Math.floor((now - start) / perChar);
      this.el.textContent = chars
        .map((c, i) => (i < fixed || c === ' ' ? c : NOISE[(Math.random() * NOISE.length) | 0]))
        .join('');
      if (fixed < chars.length) requestAnimationFrame(tick);
      else this.el.textContent = finalText;
    };
    requestAnimationFrame(tick);
  }
}
