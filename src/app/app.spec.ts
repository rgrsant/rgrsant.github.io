import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PROFILE, PROJECT_GROUPS } from './portfolio.data';

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

  it('abre links externos em nova aba com rel seguro', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    el.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((a) => {
      expect(a.rel).toContain('noopener');
    });
  });
});
