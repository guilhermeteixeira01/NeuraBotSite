// src/services/api.js
//
// ┌─────────────────┬────────────────────────────────────────────┬───────┐
// │ Processo PM2    │ Arquivo                                    │ Porta │
// ├─────────────────┼────────────────────────────────────────────┼───────┤
// │ pm2-api         │ pm2-api.js  → bots/logs/restart (interno,   │ 3001  │
// │                 │ nunca exposto ao navegador — server.js faz  │       │
// │                 │ o proxy protegido pelo mesmo API_SECRET)    │       │
// │ server          │ server.js   → subs/payments/notif + proxy   │ 3301  │
// │                 │ das rotas /api/bots/...                     │       │
// └─────────────────┴────────────────────────────────────────────┴───────┘
//
// O navegador só fala com o `server` (API_URL). Ele que repassa as ações
// de start/stop/restart/logs pro pm2-api internamente, na própria VPS —
// o PM2_API_TOKEN nunca sai do servidor, então não existe mais VITE_PM2_TOKEN
// aqui nem VITE_PM2_URL.
//
// Para sobrescrever sem mudar o código, crie .env na raiz:
//   VITE_API_URL=https://sql.neurabot.com.br
//   VITE_API_SECRET=sua-secret-aqui

const API_URL = import.meta.env.VITE_API_URL ?? 'https://sql.neurabot.com.br';
const API_SECRET = import.meta.env.VITE_API_SECRET ?? '@!@Neurabot32147';

// Debug em desenvolvimento — mostra no console qual URL está sendo usada
if (import.meta.env.DEV) {
  console.log('[api] API_URL →', API_URL);
}

// ── Server API (server.js : 3301, exposto como API_URL) ──────
export async function api(path, method = 'GET', body = null) {
  const url = API_URL + path;
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${API_SECRET}`,
      'Content-Type': 'application/json',
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(url, opts);
  if (!r.ok) throw new Error(`Server API ${r.status} — ${url}`);
  return r.json();
}

// ── PM2 (via proxy do server.js — nunca fala direto com o pm2-api) ──
//
// Mantém a mesma assinatura de antes (pm2('/bots'), pm2('/bots/start/x', 'POST'),
// pm2('/logs/x')) pra não precisar mudar cada lugar que já chama isso — só
// traduz pro novo formato de rota (/api/bots/...) por baixo dos panos.
export async function pm2(path, method = 'GET') {
  let proxied;

  if (path === '/bots') {
    proxied = '/api/bots';
  } else if (path.startsWith('/bots/')) {
    // '/bots/ACTION/NAME' → '/api/bots/ACTION/NAME'
    proxied = '/api' + path;
  } else if (path.startsWith('/logs/')) {
    // '/logs/NAME' → '/api/bots/NAME/logs'
    const name = path.slice('/logs/'.length);
    proxied = `/api/bots/${name}/logs`;
  } else {
    throw new Error(`pm2(): path não mapeado — ${path}`);
  }

  return api(proxied, method);
}