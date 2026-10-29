import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Gallery } from './portfolio.data';
import { prefersReducedMotion } from './motion';

const AUTOPLAY_MS = 5000;

/**
 * Galeria de imagens com troca em fade, setas, indicadores, teclado, gesto de
 * arrastar no celular e ampliação ao clicar. Avança sozinha enquanto está na
 * tela, e para quando a pessoa interage.
 */
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'frame-' + gallery().frame",
    '(mouseenter)': 'paused.set(true)',
    '(mouseleave)': 'paused.set(false)',
    '(focusin)': 'paused.set(true)',
    '(focusout)': 'paused.set(false)',
  },
})
export class GalleryComponent {
  readonly gallery = input.required<Gallery>();
  readonly label = input.required<string>();

  protected readonly index = signal(0);
  protected readonly paused = signal(false);
  protected readonly zoomed = signal(false);
  protected readonly total = computed(() => this.gallery().slides.length);
  protected readonly current = computed(() => this.gallery().slides[this.index()]);

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private visible = false;
  private touchedByUser = false;
  private startX: number | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
      const io = new IntersectionObserver(([e]) => (this.visible = e.isIntersecting), { threshold: 0.5 });
      io.observe(this.host);
      const timer = setInterval(() => {
        if (this.visible && !this.paused() && !this.touchedByUser && !document.hidden) this.go(1, false);
      }, AUTOPLAY_MS);
      destroyRef.onDestroy(() => {
        clearInterval(timer);
        io.disconnect();
      });
    });
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  protected go(step: number, byUser = true): void {
    if (byUser) this.touchedByUser = true;
    const n = this.total();
    this.index.update((i) => (i + step + n) % n);
  }

  protected select(i: number): void {
    this.touchedByUser = true;
    this.index.set(i);
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.go(1);
    else if (event.key === 'ArrowLeft') this.go(-1);
    else return;
    event.preventDefault();
  }

  protected onPointerDown(event: PointerEvent): void {
    this.startX = event.clientX;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.startX === null) return;
    const dx = event.clientX - this.startX;
    this.startX = null;
    if (Math.abs(dx) > 40) this.go(dx < 0 ? 1 : -1);
    else if (event.pointerType === 'mouse') this.open();
  }

  protected open(): void {
    const dialog = this.dialog()?.nativeElement;
    if (!dialog || dialog.open) return;
    this.touchedByUser = true;
    this.zoomed.set(true);
    dialog.showModal();
  }

  protected close(): void {
    this.zoomed.set(false);
    this.dialog()?.nativeElement.close();
  }
}
