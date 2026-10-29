/** true se a pessoa pediu menos movimento no sistema (ou se não dá para saber). */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'function' || matchMedia('(prefers-reduced-motion: reduce)').matches;
}
