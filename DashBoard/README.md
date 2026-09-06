# NeuraBOT Dashboard — React + Vite

Dashboard admin para gerenciar bots Discord, processos PM2 e assinaturas.

## Estrutura do projeto

```
neurabot-dashboard/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Entrypoint — monta providers
    ├── App.jsx               # Roteamento entre páginas
    ├── index.css             # Variáveis CSS globais + estilos base
    ├── App.css
    │
    ├── services/
    │   ├── firebase.js       # Inicialização Firebase + Auth
    │   └── api.js            # Helpers pm2() e api() para fetch
    │
    ├── context/
    │   ├── AuthContext.jsx   # Estado de autenticação Firebase
    │   ├── ToastContext.jsx  # Notificações globais (toast)
    │   └── LogContext.jsx    # Stream de logs em tempo real
    │
    ├── components/
    │   ├── LoginScreen.jsx   # Tela de login com Google
    │   ├── Sidebar.jsx       # Navegação lateral
    │   ├── Topbar.jsx        # Barra superior com relógio e refresh
    │   ├── StatusBadge.jsx   # Badge de status (online/offline/error)
    │   └── LogStream.jsx     # Componente de stream de logs
    │
    └── pages/
        ├── OverviewPage.jsx       # Métricas + bots em execução + log stream
        ├── BotsPage.jsx           # Tabela PM2 completa
        ├── SubscriptionsPage.jsx  # Lista de assinaturas com ações
        ├── NotificationsPage.jsx  # Broadcast e notificação individual
        ├── LogsPage.jsx           # Logs por bot
        └── DatabasePage.jsx       # Stats MySQL + filtros rápidos
```

## Instalação e uso

```bash
npm install
npm run dev
```

## Build para produção

```bash
npm run build
npm run preview
```

## Configuração

As credenciais estão em `src/services/firebase.js` (Firebase) e `src/services/api.js` (endpoints PM2/API).
