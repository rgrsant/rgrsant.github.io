/**
 * Realce de sintaxe mínimo para Python, suficiente para o arquivo do topo.
 * Quebra cada linha em pedaços com um "tipo" que vira classe CSS.
 */
export type TokenKind = 'kw' | 'str' | 'com' | 'dec' | 'fn' | 'cls' | 'type' | 'num' | 'op' | 'txt';

export interface Token {
  kind: TokenKind;
  text: string;
}

const KEYWORDS = new Set([
  'from', 'import', 'class', 'def', 'return', 'if', 'else', 'for', 'in', 'not', 'and', 'or',
  'True', 'False', 'None', 'self', 'with', 'as', 'lambda', 'pass',
]);
const TYPES = new Set(['str', 'int', 'bool', 'float', 'list', 'tuple', 'dict']);

// A ordem importa: comentários e strings vêm antes de palavras.
const PATTERN = /(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(@[\w.]+)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|(->|[()[\]{}:=,.&])|(\s+)|(.)/g;

export function highlightLine(line: string, previousWord = ''): Token[] {
  const tokens: Token[] = [];
  let prev = previousWord;
  for (const m of line.matchAll(PATTERN)) {
    const [text, com, str, dec, num, word, op] = m;
    let kind: TokenKind = 'txt';
    if (com) kind = 'com';
    else if (str) kind = 'str';
    else if (dec) kind = 'dec';
    else if (num) kind = 'num';
    else if (word) {
      if (prev === 'def') kind = 'fn';
      else if (prev === 'class') kind = 'cls';
      else if (KEYWORDS.has(word)) kind = 'kw';
      else if (TYPES.has(word)) kind = 'type';
      prev = word;
    } else if (op) kind = 'op';
    // Junta espaços e texto comum ao token anterior para gerar menos elementos.
    const last = tokens[tokens.length - 1];
    if (last && last.kind === kind && kind === 'txt') last.text += text;
    else tokens.push({ kind, text });
  }
  return tokens;
}

export function highlight(code: string): Token[][] {
  return code.split('\n').map((line) => highlightLine(line));
}
