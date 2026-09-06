// src/components/Topbar.jsx
import { useEffect, useState } from 'react';
import './Topbar.css';

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const IconMenu = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconRefresh = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4V10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 20V14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.49 9C19.98 7.57 19.12 6.28 17.98 5.27C16.85 4.26 15.47 3.56 13.99 3.22C12.51 2.89 10.97 2.93 9.5 3.36C8.04 3.78 6.71 4.56 5.64 5.64L1 10M23 14L18.36 18.36C17.29 19.44 15.96 20.22 14.5 20.64C13.03 21.07 11.49 21.11 10.01 20.78C8.52 20.44 7.15 19.74 5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────

const PAGE_TITLES = {
  overview: 'Visão geral',
  bots: 'Bots PM2',
  subscriptions: 'Assinaturas',
  notifications: 'Notificações',
  logs: 'Logs',
  database: 'MySQL',
  discordServer: 'Dados do Servidor Discord',
};

export default function Topbar({ activePage, onRefresh, onMenuToggle }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'medium' }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="topbar">
      <div className="topbar-left">
        {/* Botão hamburguer — só aparece no mobile via CSS */}
        <button className="menu-toggle" onClick={onMenuToggle} aria-label="Abrir menu">
          <IconMenu size={20} />
        </button>
        <div>
          <h1>{PAGE_TITLES[activePage] || activePage}</h1>
          <p>{time}</p>
        </div>
      </div>
      <div className="topbar-right">
        <button className="btn" onClick={onRefresh} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <IconRefresh size={14} /> <span>Atualizar</span>
        </button>
      </div>
    </div>
  );
}