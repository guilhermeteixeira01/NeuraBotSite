export const BOTS = [
  {
    id: 1,
    name: "Neura Bot",
    tag: "Multifuncional",
    color: "#3fd8ff",
    glow: "#3fd8ff33",
    icon: "cpu",
    desc: "O bot completo e totalmente configurável para o seu servidor Discord. Personalize cada detalhe do sistema de tickets, anúncios com embed e boas-vindas do jeito que você quiser.",
    stats: [
      { label: "Servidores", value: "1.2K+" },
      { label: "Usuários Atendidos", value: "800K+" },
      { label: "Uptime", value: "99.9%" },
    ],
    features: [
      {
        icon: "message-circle",
        label: "Sistema de Tickets",
        desc: "Suporte organizado com abertura, gerenciamento e fechamento de tickets. Configure canais, cargos de suporte, mensagens e categorias do jeito que precisar.",
      },
      {
        icon: "zap",
        label: "Anúncios com Embed",
        desc: "Crie anúncios profissionais com embeds totalmente personalizáveis — cor, título, descrição, imagem, rodapé e muito mais.",
      },
      {
        icon: "users",
        label: "Boas-Vindas",
        desc: "Receba novos membros com mensagens automáticas e personalizadas. Configure canal, imagem, texto e mencione o membro como quiser.",
      },
    ],
    configurable: true,
    commands: ["/painel-config", "/anuncio", "/editaranuncio"],
  },
  {
    id: 2,
    name: "Neura Bot Music",
    tag: "DESENVOLVIMENTO",
    color: "#f5c518",
    glow: "#f5c51833",
    icon: "music",
    desc: "O bot completo com sistema de comando para escutar aquela música boa com seus amigos.",
    stats: [
      { label: "Servidores", value: "..." },
      { label: "Usuários Atendidos", value: "..." },
      { label: "Uptime", value: "..." },
    ],
    features: [
      {
        icon: "music",
        label: "Sistema de Música",
        desc: "Ouça música com seus amigos em canais de voz.",
      },
    ],
    configurable: true,
    commands: ["m!p", "m!s", "m!stop"],
  },
];
