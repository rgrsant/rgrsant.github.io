import { highlightLine } from './highlight';

describe('highlightLine', () => {
  const kinds = (line: string) => highlightLine(line).filter((t) => t.text.trim()).map((t) => `${t.kind}:${t.text.trim()}`);

  it('marca palavras-chave, nome da classe e decorator', () => {
    expect(kinds('@dataclass(frozen=True)')).toEqual(['dec:@dataclass', 'op:(', 'txt:frozen', 'op:=', 'kw:True', 'op:)']);
    expect(kinds('class Rogerio:')).toEqual(['kw:class', 'cls:Rogerio', 'op::']);
  });

  it('reconhece strings, tipos e nome de função', () => {
    expect(kinds('    nome: str = "Rogério"')).toEqual(['txt:nome', 'op::', 'type:str', 'op:=', 'str:"Rogério"']);
    expect(kinds('    def ok(self) -> bool:')).toEqual(['kw:def', 'fn:ok', 'op:(', 'kw:self', 'op:)', 'op:->', 'type:bool', 'op::']);
  });

  it('não quebra comentários', () => {
    expect(kinds('# rogerio.py')).toEqual(['com:# rogerio.py']);
  });
});
