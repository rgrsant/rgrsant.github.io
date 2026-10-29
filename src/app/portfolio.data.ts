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

/** Uma imagem da galeria. `src` é relativo à pasta public/. */
export interface Slide {
  src: string;
  alt: string;
  caption: string;
}

export interface Gallery {
  /** 'phone' desenha uma moldura de celular; 'browser', uma janela de navegador. */
  frame: 'phone' | 'browser';
  /** Texto da barra de endereço (só na moldura de navegador). */
  url?: string;
  slides: Slide[];
}

export interface Project {
  name: string;
  role: string;
  summary: string;
  highlights?: string[];
  stack: string[];
  status?: string;
  link?: Link;
  gallery?: Gallery;
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
  // Commits próprios (sem merges) nas branches do Rogério, por repositório.
  repos: [
    { name: 'ninjazap-front', label: 'Front-end (Angular)', commits: 71 },
    { name: 'ninjazap-back', label: 'Back-end (Node.js)', commits: 59 },
    { name: 'ninjazap-test', label: 'Testes E2E (Cypress)', commits: 34 },
    { name: 'ninjazap-commons', label: 'Modelos compartilhados', commits: 18 },
  ],
  // Galeria opcional: coloque prints em public/projetos/ e liste aqui.
  gallery: undefined as Gallery | undefined,
};

/** Commits por dia no NinjaZap, tirados do histórico do Git (sem merges). */
export const NINJAZAP_COMMITS: Record<string, number> = {
  '2025-12-16': 1,
  '2025-12-18': 1,
  '2025-12-19': 1,
  '2025-12-23': 1,
  '2025-12-26': 1,
  '2026-01-04': 3,
  '2026-01-08': 1,
  '2026-01-14': 2,
  '2026-01-16': 1,
  '2026-01-23': 1,
  '2026-01-26': 1,
  '2026-01-27': 6,
  '2026-01-28': 2,
  '2026-01-29': 2,
  '2026-02-04': 2,
  '2026-02-09': 1,
  '2026-02-11': 2,
  '2026-02-20': 1,
  '2026-02-23': 1,
  '2026-02-24': 3,
  '2026-03-04': 1,
  '2026-03-05': 1,
  '2026-03-12': 1,
  '2026-03-20': 1,
  '2026-03-21': 1,
  '2026-04-07': 5,
  '2026-04-08': 2,
  '2026-04-09': 1,
  '2026-04-10': 1,
  '2026-04-14': 1,
  '2026-04-17': 3,
  '2026-04-20': 1,
  '2026-04-22': 2,
  '2026-04-24': 2,
  '2026-04-28': 1,
  '2026-04-30': 1,
  '2026-05-04': 2,
  '2026-05-05': 1,
  '2026-05-08': 1,
  '2026-05-12': 2,
  '2026-05-14': 2,
  '2026-05-15': 4,
  '2026-05-19': 2,
  '2026-05-25': 4,
  '2026-05-27': 1,
  '2026-05-28': 2,
  '2026-05-29': 2,
  '2026-06-01': 2,
  '2026-06-02': 2,
  '2026-06-03': 3,
  '2026-06-08': 1,
  '2026-06-09': 4,
  '2026-06-10': 3,
  '2026-06-11': 1,
  '2026-06-12': 1,
  '2026-06-16': 1,
  '2026-06-17': 4,
  '2026-06-30': 2,
  '2026-07-01': 2,
  '2026-07-03': 2,
  '2026-07-07': 2,
  '2026-07-10': 1,
  '2026-07-15': 2,
  '2026-07-16': 2,
  '2026-07-20': 3,
  '2026-07-23': 1,
  '2026-07-27': 2,
  '2026-07-30': 1,
  '2026-08-01': 3,
  '2026-08-19': 4,
  '2026-08-20': 1,
  '2026-08-21': 4,
  '2026-08-26': 1,
  '2026-08-28': 2,
  '2026-08-31': 1,
  '2026-09-01': 1,
  '2026-09-02': 1,
  '2026-09-03': 2,
  '2026-09-04': 2,
  '2026-09-09': 6,
  '2026-09-10': 2,
  '2026-09-11': 3,
  '2026-09-15': 3,
  '2026-09-22': 2,
  '2026-09-23': 2,
  '2026-09-26': 2,
  '2026-09-28': 2,
  '2026-09-30': 1,
  '2026-10-05': 2,
  '2026-10-06': 1,
  '2026-10-07': 1,
  '2026-10-21': 3,
  '2026-10-22': 1,
  '2026-10-23': 1,
  '2026-10-26': 2,
  '2026-10-27': 2,
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
    'Timer de estudo e de trabalho que vale o dobro, com início e fim carimbados pelo relógio do banco para não dar para burlar.',
    'Row Level Security em todas as tabelas: ninguém lê o histórico de ninguém, e o ranking devolve só somas.',
    'Mais de 100 testes de segurança rodando contra o banco, inclusive em Postgres WebAssembly para funcionar no Windows.',
  ],
  stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL'],
  gallery: {
    frame: 'phone',
    slides: [
      {
        src: 'projetos/lifemaxxing-missoes.webp',
        alt: 'Tela Missões do LifeMaxxing com os pontos de hoje e da semana e as categorias numeradas',
        caption: 'Missões: pontos de hoje e da semana, e o progresso de cada categoria contra o teto diário.',
      },
      {
        src: 'projetos/lifemaxxing-registrar.webp',
        alt: 'Categoria Estudos aberta com o timer e a lista de disciplinas, cada uma com o botão Ligar',
        caption: 'Estudos por disciplina: dá para ligar o timer em Cálculo, Física ou outra matéria, ou registrar manualmente.',
      },
      {
        src: 'projetos/lifemaxxing-timer.webp',
        alt: 'Timer ligado estudando Circuitos Lógicos, com o tempo corrido e os pontos acumulados até agora',
        caption: 'Timer ligado: o tempo cronometrado vale o dobro de pontos, com início e fim carimbados pelo servidor.',
      },
      {
        src: 'projetos/lifemaxxing-historico.webp',
        alt: 'Histórico recente com cada missão, a disciplina, o horário e os pontos ganhos',
        caption: 'Histórico: cada registro com a disciplina, se foi com timer e quantos pontos rendeu.',
      },
      {
        src: 'projetos/lifemaxxing-amigos.webp',
        alt: 'Ranking de amigos com filtros por semana, mês, ano e geral',
        caption: 'Amigos: ranking por semana, mês, ano ou geral, e grupos fechados por código de convite.',
      },
      {
        src: 'projetos/lifemaxxing-perfil.webp',
        alt: 'Perfil com avatar, @ do usuário, pontuação por período e tempo estudado',
        caption: 'Perfil: @ personalizado, pontuação por período e o tempo total de estudo.',
      },
      {
        src: 'projetos/lifemaxxing-disciplinas.webp',
        alt: 'Tempo estudado por disciplina nos últimos 7 dias, com barras de porcentagem',
        caption: 'Quanto tempo foi para cada disciplina, em 24 horas, 7 dias, 30 dias ou desde o começo.',
      },
      {
        src: 'projetos/lifemaxxing-escuro.webp',
        alt: 'Tela Missões no tema escuro',
        caption: 'Tema escuro opcional, salvo no aparelho.',
      },
    ],
  },
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
        gallery: {
          frame: 'browser',
          url: 'quietflow · anotações',
          slides: [
            {
              src: 'projetos/quietflow-anotacoes.webp',
              alt: 'Tela Todas as anotações do QuietFlow com a barra lateral separando Anotações e Tarefas',
              caption: 'Anotações e Tarefas viraram seções independentes, com Anotações em primeiro na barra lateral.',
            },
            {
              src: 'projetos/quietflow-leitura.webp',
              alt: 'Uma anotação aberta em modo de leitura com o botão Editar',
              caption: 'As notas abrem em modo de leitura; para mudar, você entra no modo de edição.',
            },
            {
              src: 'projetos/quietflow-edicao.webp',
              alt: 'Anotação em modo de edição com barra de formatação e botão Salvar anotação',
              caption: 'Modo de edição com título renomeável e botão de salvar.',
            },
            {
              src: 'projetos/quietflow-idioma.webp',
              alt: 'Preferências do QuietFlow com Português (Brasil) selecionado como idioma',
              caption: 'A interface inteira traduzida para português.',
            },
          ],
        },
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
        gallery: {
          frame: 'browser',
          url: 'brota · painel do anfitrião',
          slides: [
            {
              src: 'projetos/brota-eventos.webp',
              alt: 'Painel Meus Eventos do Brota listando dois eventos com data, local, confirmados e convites',
              caption: 'Lista de eventos no painel do anfitrião, com confirmados e convites de cada festa.',
            },
            {
              src: 'projetos/brota-novo-evento.webp',
              alt: 'Formulário Criar Novo Evento com título, descrição, link gerado e datas preenchidos',
              caption: 'Criação de eventos: o link do convite é gerado a partir do título.',
            },
          ],
        },
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

// Arquivo Python mostrado no topo da página. O realce de cores é feito por
// src/app/highlight.ts, então basta editar o texto abaixo.
export const HERO_FILE = 'rogerio.py';

export const HERO_CODE = `from dataclasses import dataclass


@dataclass(frozen=True)
class Rogerio:
    nome: str = "Rogério Santana"
    cidade: str = "Rio de Janeiro, RJ"
    graduacao: str = "Eng. de Computação e Informação, UFRJ"
    tecnico: str = "Informática para Internet, FAETEC"
    cargo: str = "Estagiário em Desenvolvimento de Software e IA"
    linguagens: tuple = ("TypeScript", "Python", "C", "SQL")
    frameworks: tuple = ("Angular", "React Native", "Node.js")
    testes: tuple = ("Cypress", "Cucumber", "Jenkins")
    estudando: tuple = ("Cibersegurança", "IA")

    def aberto_a_novos_desafios(self) -> bool:
        return True`;

/** Linhas do "terminal" que aparecem depois do código. */
export const HERO_REPL = [
  { prompt: '>>>', text: 'Rogerio().aberto_a_novos_desafios()' },
  { prompt: '', text: 'True' },
];
