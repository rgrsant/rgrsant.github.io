import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

interface Cell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  label: string;
}

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Mapa de calor de commits por dia, no estilo do GitHub: cada coluna é uma
 * semana (segunda a domingo) e a cor mostra quantos commits houve no dia.
 */
@Component({
  selector: 'app-activity',
  templateUrl: './activity.html',
  styleUrl: './activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Activity {
  readonly commits = input.required<Record<string, number>>();
  readonly from = input.required<string>(); // AAAA-MM-DD
  readonly to = input.required<string>();

  protected readonly total = computed(() => Object.values(this.commits()).reduce((a, b) => a + b, 0));
  protected readonly activeDays = computed(() => Object.keys(this.commits()).length);

  protected readonly weeks = computed(() => {
    const data = this.commits();
    // Começa na segunda-feira da semana de `from` (datas em UTC para não variar com o fuso).
    const start = new Date(this.from() + 'T00:00:00Z');
    start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
    const end = new Date(this.to() + 'T00:00:00Z');

    const weeks: { month: string | null; cells: (Cell | null)[] }[] = [];
    let lastMonth = -1;
    for (const d = new Date(start); d <= end; ) {
      const cells: (Cell | null)[] = [];
      let month: string | null = null;
      for (let i = 0; i < 7; i++, d.setUTCDate(d.getUTCDate() + 1)) {
        if (d > end || iso(d) < this.from()) {
          cells.push(null);
          continue;
        }
        if (d.getUTCMonth() !== lastMonth && d.getUTCDate() <= 7) {
          lastMonth = d.getUTCMonth();
          month = MONTHS[lastMonth];
        }
        const count = data[iso(d)] ?? 0;
        const level = (count === 0 ? 0 : count === 1 ? 1 : count <= 2 ? 2 : count <= 4 ? 3 : 4) as Cell['level'];
        const day = `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
        cells.push({
          date: iso(d),
          count,
          level,
          label: count ? `${count} commit${count > 1 ? 's' : ''} em ${day}` : `Nenhum commit em ${day}`,
        });
      }
      weeks.push({ month, cells });
    }
    return weeks;
  });
}
