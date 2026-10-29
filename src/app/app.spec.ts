import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { HERO_LINES, PROFILE, PROJECT_GROUPS, gherkinSummary } from './portfolio.data';

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

  it('desenha uma linha do cenário Gherkin para cada item de HERO_LINES', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.gherkin .line').length).toBe(HERO_LINES.length);
  });

  it('conta os passos como o Cucumber: Contexto roda em cada cenário', () => {
    expect(
      gherkinSummary([
        { kind: 'background', keyword: 'Contexto:', text: '' },
        { kind: 'step', keyword: 'Dado', text: 'a' },
        { kind: 'scenario', keyword: 'Cenário:', text: '1' },
        { kind: 'step', keyword: 'Então', text: 'b' },
        { kind: 'scenario', keyword: 'Cenário:', text: '2' },
        { kind: 'step', keyword: 'Então', text: 'c' },
      ]),
    ).toEqual({ scenarios: 2, steps: 4 });
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
