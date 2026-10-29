import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { FEATURED, HERO_CODE, PROFILE, PROJECT_GROUPS } from './portfolio.data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('mostra o nome no título principal', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain(PROFILE.name);
  });

  it('renderiza todos os projetos dos grupos', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const total = PROJECT_GROUPS.reduce((n, g) => n + g.projects.length, 0);
    expect(el.querySelectorAll('.project').length).toBe(total);
  });

  it('desenha uma linha do arquivo Python para cada linha de HERO_CODE', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.code .line').length).toBe(HERO_CODE.split('\n').length);
  });

  it('mostra uma imagem para cada slide das galerias', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const slides =
      (FEATURED.gallery?.slides.length ?? 0) +
      PROJECT_GROUPS.flatMap((g) => g.projects).reduce((n, p) => n + (p.gallery?.slides.length ?? 0), 0);
    expect(el.querySelectorAll('app-gallery .stage img').length).toBe(slides);
    el.querySelectorAll('app-gallery .stage img').forEach((img) => expect(img.getAttribute('alt')).toBeTruthy());
  });

  it('soma 182 commits no mapa de atividade', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-activity figcaption')?.textContent).toContain('182 commits');
  });

  it('abre links externos em nova aba com rel seguro', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    el.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((a) => {
      expect(a.rel).toContain('noopener');
    });
  });
});
