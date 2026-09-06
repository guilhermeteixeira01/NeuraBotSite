# Neura Bot — Site de Bots Discord

Site futurista construído em React + Vite para apresentar a suíte de bots Neura Bot.

---

## Estrutura do Projeto

```
Neura Bot/
├── index.html                    # HTML raiz
├── vite.config.js                # Configuração do Vite
├── package.json
│
└── src/
    ├── main.jsx                  # Entry point React
    ├── App.jsx                   # Root: Scanline + Navbar + Pages + Footer
    │
    ├── styles/
    │   └── global.css            # CSS global, fontes, animações, botões
    │
    ├── data/
    │   ├── bots.js               # Array dos 4 bots (nome, cor, stats, comandos)
    │   ├── plans.js              # Array dos planos de preço
    │   └── site.js              # Stats gerais, features, nav links, footer cols
    │
    ├── hooks/
    │   ├── useScrollY.js         # Hook — scroll position para Navbar
    │   └── useCursorBlink.js     # Hook — cursor piscante no console
    │
    ├── components/
    │   ├── ui/                   # Componentes visuais reutilizáveis
    │   │   ├── Scanline.jsx      # Overlay de linhas de CRT
    │   │   ├── ParticleField.jsx # Canvas com partículas animadas
    │   │   ├── Console3D.jsx     # Terminal 3D perspectivado e interativo
    │   │   ├── BotCard.jsx       # Card individual de bot
    │   │   └── SectionLabel.jsx  # Eyebrow label das seções
    │   │
    │   ├── layout/               # Estrutura global da página
    │   │   ├── Navbar.jsx        # Barra de navegação fixa com scroll-aware
    │   │   └── Footer.jsx        # Rodapé com colunas de links
    │   │
    │   └── sections/             # Seções da landing page
    │       ├── HeroSection.jsx   # Hero com mascote, partículas e CTA
    │       ├── StatsBar.jsx      # Faixa de números gerais
    │       ├── BotsSection.jsx   # Cards dos bots + console 3D
    │       ├── FeaturesSection.jsx # Grid de features de infraestrutura
    │       ├── PlansSection.jsx  # Tabela de planos
    │       └── CTASection.jsx    # Call-to-action final
    │
    └── pages/
        └── HomePage.jsx          # Compõe todas as sections em ordem
```