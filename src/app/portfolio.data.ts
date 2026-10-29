// Todo o conteúdo do portfólio mora aqui.
// Para atualizar o site, edite este arquivo — os componentes só leem estes dados.

export interface Link {
  label: string;
  href: string;
}

export interface Milestone {
  period: string;
  title: string;
  items: string[];
}

export interface Project {
  name: string;
  role: string;
  summary: string;
  highlights?: string[];
  stack: string[];
  status?: string;
  link?: Link;
}

export interface ProjectGroup {
  title: string;
  intro: string;
  projects: Project[];
}

export interface Skill {
  name: string;
  where: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface Course {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export const PROFILE = {
  name: 'Rogério Santana',
  role: 'Estudante de Engenharia de Computação e Informação na UFRJ e estagiário de desenvolvimento e QA na Vivier.',
  about:
    'Escrevo front-end em Angular e TypeScript, cubro os fluxos com testes E2E em Cypress e Cucumber, e estou construindo meu próprio app mobile. Me interesso por cibersegurança e por usar IA de forma deliberada no dia a dia de desenvolvimento.',
  location: 'Rio de Janeiro, RJ',
  languages: 'Português nativo, inglês fluente, espanhol básico',
  links: [
    { label: 'E-mail', href: 'mailto:rgrsantana@outlook.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rgrsant' },
    { label: 'GitHub', href: 'https://github.com/rgrsant' },
  ] as Link[],
};

export const WORK = {
  company: 'Vivier',
  product: 'NinjaZap',
  productUrl: 'https://www.ninjazap.com.br',
  title: 'Estagiário em Desenvolvimento de Software e IA',
  period: 'Dez 2025 – atual',
  summary:
    'O NinjaZap é uma plataforma de agentes de atendimento com IA para WhatsApp. Trabalho no front-end (Angular), no back-end (Node.js, TypeScript e MongoDB) e na suíte de testes automatizados, além de dar suporte direto a clientes.',
  stats: [
    { value: '180+', label: 'commits próprios' },
    { value: '4', label: 'repositórios: front, back, commons e testes' },
  ],
  milestones: [
    {
      period: 'Dez 2025 – Mar 2026',
      title: 'Suíte de testes E2E do zero',
      items: [
        'Montei os testes em Cypress com Cucumber (BDD) para agentes, contatos, login e interface.',
        'Escrevi cenários de segurança: acesso sem login, acesso ao agente de outro usuário e usuário comum tentando entrar na área administrativa.',
        'Reestruturei a suíte para reaproveitar steps e comandos, e configurei a execução no Jenkins.',
      ],
    },
    {
      period: 'Abr – Mai 2026',
      title: 'Plano gratuito de 30 dias',
      items: [
        'Limite de agentes por plano e bloqueio automático quando o período de teste expira, do banco à interface.',
        'E-mails de aviso 7 e 3 dias antes do fim do teste, e modal de boas-vindas explicando o período grátis.',
      ],
    },
    {
      period: 'Jun – Ago 2026',
      title: 'Contatos, campanhas e disparos',
      items: [
        'Filtros de contatos por atributo e por DDD.',
        'Estimativa de término e total de destinatários antes de confirmar um disparo em massa.',
        'Permissões de leitura e de operador nas campanhas, validadas no front e no back.',
        'Integração com uma API jurídica de monitoramento de processos, com a chave de API configurada por cada cliente.',
      ],
    },
    {
      period: 'Set – Out 2026',
      title: 'Painel administrativo',
      items: [
        'Gráficos de crescimento de usuários e distribuição de agentes, com seletor de período.',
        'Filtros na gestão de pagamentos e modo de visualização como administrador ou como usuário.',
        'Novo template dos e-mails da plataforma e ajustes de responsividade.',
      ],
    },
  ] as Milestone[],
  stack: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Cypress', 'Cucumber', 'Jenkins'],
};

export const FEATURED: Project = {
  name: 'LifeMaxxing',
  role: 'Projeto próprio',
  status: 'Em desenvolvimento',
  summary:
    'App de produtividade gamificada para iOS e Android. Você registra horas de treino, trabalho, estudo e páginas lidas, ganha pontos e disputa um ranking com amigos e grupos.',
  highlights: [
    'Regra única de pontuação: uma hora de esforço vale 200 pontos em qualquer categoria, então o ranking mede dedicação e não a escolha da categoria.',
    'Os pontos são calculados no Postgres e nunca aceitos do app. Cada registro tem dono garantido pelo servidor, com tetos diários por categoria.',
    'Row Level Security em todas as tabelas: ninguém lê o histórico de ninguém, e o ranking devolve só somas.',
    'Mais de 100 testes de segurança rodando contra o banco, inclusive em Postgres WebAssembly para funcionar no Windows.',
  ],
  stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL'],
};

export const PROJECT_GROUPS: ProjectGroup[] = [
  {
    title: 'Colaborações',
    intro: 'Projetos open source de outras pessoas em que abri branches e contribuí com funcionalidades.',
    projects: [
      {
        name: 'QuietFlow',
        role: 'Colaborador',
        summary:
          'Gerenciador de tarefas e notas em Markdown, local-first, para desktop (Tauri) e web.',
        highlights: [
          'Adicionei testes automatizados com Cypress.',
          'Traduzi a interface para português.',
          'Separei Tarefas e Notas em seções independentes, com modo de leitura e edição nas notas.',
        ],
        stack: ['React', 'TypeScript', 'Tauri', 'Cypress'],
        link: { label: 'Repositório', href: 'https://github.com/cemendes/QuietFlow' },
      },
      {
        name: 'Brota',
        role: 'Colaborador',
        summary:
          'Convites online auto-hospedados para encontros em casa, com RSVP, lista do que cada um leva e endereço revelado só para quem confirma.',
        highlights: [
          'Criei o script de seed do banco e a lista de eventos no painel do anfitrião.',
          'Implementei a criação de eventos genéricos.',
        ],
        stack: ['Next.js', 'TypeScript', 'SQLite', 'Docker'],
      },
    ],
  },
  {
    title: 'Testes automatizados',
    intro: 'Projetos de estudo focados em QA.',
    projects: [
      {
        name: 'Shulker',
        role: 'Estudo',
        summary:
          'Sistema de gestão de biblioteca em React com testes E2E em Cypress e cenários BDD em Cucumber para login e cadastro de livros.',
        stack: ['React', 'TypeScript', 'Cypress', 'Cucumber'],
        link: {
          label: 'Repositório',
          href: 'https://github.com/rgrsant/shulker-sistema-de-gestao-de-biblioteca-online',
        },
      },
      {
        name: 'Automação de login',
        role: 'Estudo',
        summary: 'Testes E2E de um fluxo de login com Cypress.',
        stack: ['Cypress', 'JavaScript'],
        link: { label: 'Repositório', href: 'https://github.com/rgrsant/auto-login' },
      },
    ],
  },
  {
    title: 'Web, do começo',
    intro: 'Os primeiros sites, ainda no ensino técnico e no primeiro estágio.',
    projects: [
      {
        name: 'Camisa Dez',
        role: 'TCC na FAETEC, em grupo de cinco',
        summary:
          'Portal de notícias de futebol com dados das cinco principais ligas europeias e da elite do futebol brasileiro, hospedado na HostNet.',
        stack: ['WordPress', 'MySQL'],
      },
      {
        name: 'Site da Nova Prestech',
        role: 'Estágio, 2020',
        summary: 'Site institucional da empresa de TI onde estagiei, com páginas de serviços e formulário de contato.',
        stack: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        link: { label: 'Repositório', href: 'https://github.com/rgrsant/prestech-website' },
      },
      {
        name: 'Tela de login do League of Legends',
        role: 'Estudo',
        summary: 'Recriação da tela de login do cliente do jogo.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        link: { label: 'Repositório', href: 'https://github.com/rgrsant/lol-login-screen' },
      },
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Linguagens',
    skills: [
      { name: 'TypeScript e JavaScript', where: 'NinjaZap, LifeMaxxing, colaborações' },
      { name: 'Python', where: 'UFRJ e projetos de estudo' },
      { name: 'C', where: 'UFRJ e exercícios de algoritmos' },
      { name: 'SQL', where: 'PostgreSQL no LifeMaxxing, MySQL na FAETEC' },
      { name: 'PHP', where: 'FAETEC e site da Nova Prestech' },
    ],
  },
  {
    title: 'Front-end e mobile',
    skills: [
      { name: 'Angular', where: 'NinjaZap e este portfólio' },
      { name: 'React Native e Expo', where: 'LifeMaxxing' },
      { name: 'HTML e CSS', where: 'Desde o técnico' },
    ],
  },
  {
    title: 'Back-end e dados',
    skills: [
      { name: 'Node.js e Express', where: 'NinjaZap' },
      { name: 'MongoDB', where: 'NinjaZap' },
      { name: 'Supabase e PostgreSQL', where: 'LifeMaxxing, com RLS e triggers' },
    ],
  },
  {
    title: 'Qualidade e entrega',
    skills: [
      { name: 'Cypress e Cucumber (BDD)', where: 'NinjaZap, Shulker, QuietFlow' },
      { name: 'Jenkins', where: 'Execução dos testes do NinjaZap' },
      { name: 'Git e GitHub', where: 'Todos os projetos' },
    ],
  },
];

export const EDUCATION = [
  {
    school: 'Universidade Federal do Rio de Janeiro (UFRJ)',
    course: 'Bacharelado em Engenharia de Computação e Informação',
    period: 'Ago 2025 – previsão Ago 2029',
    detail: 'Cursando o 3º período. Cálculo, Álgebra Linear, Física, programação em Python e C, Redes de Computadores.',
  },
  {
    school: 'FAETEC, Escola Técnica Estadual Oscar Tenório',
    course: 'Técnico em Informática para Internet, integrado ao ensino médio',
    period: 'Mar 2018 – Mai 2021',
    detail: 'Algoritmos, desenvolvimento web, PHP, MySQL e design. TCC: portal Camisa Dez.',
  },
];

export const COURSES: Course[] = [
  { name: 'Mantenha a segurança: gerenciamento de riscos', issuer: 'Google', date: 'Abr 2025' },
  { name: 'Fundamentos de Cibersegurança', issuer: 'Google', date: 'Mar 2025' },
  { name: 'Google AI Essentials', issuer: 'Google', date: 'Mar 2025' },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2023',
    link: 'https://www.credly.com/badges/da636b83-bfd5-4d93-a37d-f7e173611dba',
  },
  { name: 'Introdução à Lei Geral de Proteção de Dados (LGPD)', issuer: 'ENAP', date: 'Nov 2020' },
  { name: 'Introduction to IoT', issuer: 'Cisco Networking Academy', date: 'Nov 2020' },
  { name: 'Cybersecurity Essentials', issuer: 'Cisco Networking Academy', date: 'Ago 2020' },
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', date: 'Ago 2020' },
  { name: 'IT Essentials', issuer: 'Cisco Networking Academy', date: 'Dez 2018' },
];

// Cenário Gherkin do topo da página. Cada linha aparece em sequência,
// como um teste do Cucumber rodando.
export type GherkinLine =
  | { kind: 'comment' | 'blank'; text?: string }
  | { kind: 'feature' | 'background' | 'scenario'; keyword: string; text: string }
  | { kind: 'step'; keyword: string; text: string };

export const HERO_LINES: GherkinLine[] = [
  { kind: 'comment', text: '# language: pt' },
  { kind: 'feature', keyword: 'Funcionalidade:', text: 'Rogério Santana' },
  { kind: 'blank' },
  { kind: 'background', keyword: 'Contexto:', text: '' },
  { kind: 'step', keyword: 'Dado', text: 'que eu moro no Rio de Janeiro' },
  { kind: 'step', keyword: 'E', text: 'estudo Engenharia de Computação e Informação na UFRJ' },
  { kind: 'step', keyword: 'E', text: 'sou técnico em Informática para Internet pela FAETEC' },
  { kind: 'blank' },
  { kind: 'scenario', keyword: 'Cenário:', text: 'Durante o dia' },
  { kind: 'step', keyword: 'Quando', text: 'eu chego na Vivier' },
  { kind: 'step', keyword: 'Então', text: 'construo telas em Angular para o NinjaZap' },
  { kind: 'step', keyword: 'E', text: 'escrevo testes E2E em Cypress e Cucumber' },
  { kind: 'blank' },
  { kind: 'scenario', keyword: 'Cenário:', text: 'Depois do expediente' },
  { kind: 'step', keyword: 'Quando', text: 'o estágio acaba' },
  { kind: 'step', keyword: 'Então', text: 'eu desenvolvo o LifeMaxxing em React Native' },
  { kind: 'step', keyword: 'E', text: 'estudo cibersegurança e IA' },
  { kind: 'step', keyword: 'Mas', text: 'sempre sobra tempo pra uma partida de League of Legends' },
];

/** Resumo no formato do Cucumber: os passos do Contexto rodam em cada cenário. */
export function gherkinSummary(lines: GherkinLine[]): { scenarios: number; steps: number } {
  let scenarios = 0;
  let background = 0;
  let own = 0;
  let inBackground = false;
  for (const l of lines) {
    if (l.kind === 'background') inBackground = true;
    if (l.kind === 'scenario') {
      inBackground = false;
      scenarios++;
    }
    if (l.kind === 'step') inBackground ? background++ : own++;
  }
  return { scenarios, steps: background * scenarios + own };
}
