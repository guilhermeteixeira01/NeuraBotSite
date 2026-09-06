// src/services/api.js
//
// ┌─────────────────┬──────────────────────────────────┬───────┐
// │ Processo PM2    │ Arquivo                          │ Porta │
// ├─────────────────┼──────────────────────────────────┼───────┤
// │ pm2-api         │ pm2-api.js  → bots/logs/restart  │ 3001  │
// │ server          │ server.js   → subs/payments/notif │ 3301  │
// └─────────────────┴──────────────────────────────────┴───────┘
//
// Para sobrescrever sem mudar o código, crie .env na raiz:
//   VITE_PM2_URL=https://pm2.neurabot.com.br
//   VITE_API_URL=https://sql.neurabot.com.br:3301

const PM2_URL = import.meta.env.VITE_PM2_URL ?? 'https://pm2.neurabot.com.br';
const PM2_TOKEN = import.meta.env.VITE_PM2_TOKEN ?? 'neurabot_super_token_2026';
const API_URL = import.meta.env.VITE_API_URL ?? 'https://sql.neurabot.com.br:3301';
const API_SECRET = import.meta.env.VITE_API_SECRET ?? '@!@Neurabot32147';

// Debug em desenvolvimento — mostra no console qual URL está sendo usada
if (import.meta.env.DEV) {
  console.log('[api] PM2_URL →', PM2_URL);
  console.log('[api] API_URL →', API_URL);
}

// ── PM2 API (pm2-api.js : 3001) ──────────────────────────────
export async function pm2(path, method = 'GET') {
  const url = PM2_URL + path;
  const r = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${PM2_TOKEN}` },
  });
  if (!r.ok) throw new Error(`PM2 API ${r.status} — ${url}`);
  return r.json();
}

// ── Server API (server.js : 3301) ────────────────────────────
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
