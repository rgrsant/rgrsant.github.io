import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Faz o elemento surgir (fade + desfoque) quando entra na tela e sumir
 * suavemente quando sai. O CSS das classes está em src/styles.scss.
 */
@Directive({ selector: '[appReveal]', host: { class: 'reveal' } })
export class Reveal {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        this.el.classList.add('is-visible');
        return;
      }
      const io = new IntersectionObserver(
        ([entry]) => this.el.classList.toggle('is-visible', entry.isIntersecting),
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );
      io.observe(this.el);
    });
  }
}
