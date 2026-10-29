// Chuva estilo Matrix calculada em WebAssembly (AssemblyScript).
// Este módulo guarda o estado de cada coluna e decide o próximo caractere.
// O JavaScript (src/app/matrix-rain.ts) só lê a memória e desenha no canvas.
//
// Compilar: npm run build:wasm  (gera public/rain.wasm)

let cols: i32 = 0;
let rows: f32 = 0;
let glyphCount: u32 = 1;
let seed: u32 = 1;

let dropsPtr: usize = 0; // f32 por coluna: linha atual da "gota"
let speedPtr: usize = 0; // f32 por coluna: velocidade em linhas por quadro
let glyphPtr: usize = 0; // u16 por coluna: índice do caractere a desenhar

// Gerador pseudoaleatório xorshift32: rápido e determinístico.
function rand(): u32 {
  let x = seed;
  x ^= x << 13;
  x ^= x >> 17;
  x ^= x << 5;
  seed = x;
  return x;
}

function randf(): f32 {
  return <f32>(rand() & 0xffffff) / <f32>16777216.0;
}

export function init(columns: i32, visibleRows: i32, randomSeed: u32, glyphs: u32): void {
  heap.reset(); // libera a memória da tela anterior (ex.: ao redimensionar)
  cols = columns;
  rows = <f32>visibleRows;
  glyphCount = glyphs > 0 ? glyphs : 1;
  seed = randomSeed != 0 ? randomSeed : 0x9e3779b9;

  dropsPtr = heap.alloc(<usize>cols << 2);
  speedPtr = heap.alloc(<usize>cols << 2);
  glyphPtr = heap.alloc(<usize>cols << 1);

  for (let i = 0; i < cols; i++) {
    const off = <usize>i << 2;
    // Começa acima da tela em alturas diferentes, para as colunas não caírem juntas.
    store<f32>(dropsPtr + off, -randf() * rows);
    store<f32>(speedPtr + off, 0.35 + randf() * 0.65);
  }
}

export function step(): void {
  for (let i = 0; i < cols; i++) {
    const off = <usize>i << 2;
    let y = load<f32>(dropsPtr + off) + load<f32>(speedPtr + off);
    // Passou do fim da tela: volta ao topo em algum momento aleatório.
    if (y > rows && randf() > 0.96) {
      y = -randf() * 8;
      store<f32>(speedPtr + off, 0.35 + randf() * 0.65);
    }
    store<f32>(dropsPtr + off, y);
    store<u16>(glyphPtr + (<usize>i << 1), <u16>(rand() % glyphCount));
  }
}

export function dropsOffset(): usize {
  return dropsPtr;
}

export function glyphsOffset(): usize {
  return glyphPtr;
}
