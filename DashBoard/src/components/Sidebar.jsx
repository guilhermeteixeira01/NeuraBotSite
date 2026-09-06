// src/components/Sidebar.jsx
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './Sidebar.css';

import botlogo from "../../../imgs/logoname2.png";

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const IconBot = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="3" r="1" fill="currentColor" />
    <circle cx="8.5" cy="14" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="14" r="1.5" fill="currentColor" />
    <path d="M9 17.5C9 17.5 10 18.5 12 18.5C14 18.5 15 17.5 15 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 13H1M23 13H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCreditCard = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5" />
    <rect x="5" y="13" width="4" height="2" rx="0.5" fill="currentColor" />
  </svg>
);

const IconBell = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconDatabase = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 5V12C3 13.66 7.03 15 12 15C16.97 15 21 13.66 21 12V5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 12V19C3 20.66 7.03 22 12 22C16.97 22 21 20.66 21 19V12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconLogout = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconClose = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_NAV = [
  { page: 'overview', icon: <IconBot size={18} />, label: 'Bots PM2' },
  { page: 'subscriptions', icon: <IconCreditCard size={18} />, label: 'Assinaturas' },
  { page: 'notifications', icon: <IconBell size={18} />, label: 'Notificações' },
  { page: 'database', icon: <IconDatabase size={18} />, label: 'MySQL' },
];

const USER_NAV = [
  { page: 'subscriptions', icon: <IconCreditCard size={18} />, label: 'Minha Assinatura' },
  { page: 'notifications', icon: <IconBell size={18} />, label: 'Notificações' },
  { page: 'discordServer', icon: <IconBot size={18} />, label: 'Servidor Discord' },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose, isAdmin }) {
  const { user } = useAuth();
  const { toast } = useToast();

  const navItems = isAdmin ? ADMIN_NAV : USER_NAV;

  async function handleLogout() {
    await signOut(auth);
    toast('Saiu com sucesso', 'info');
    onClose?.();
  }

  return (
    <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`}>
      <button className="sidebar-close" onClick={onClose} aria-label="Fechar menu">
        <IconClose size={16} />
      </button>

      <div className="sidebar-logo">
        <img src={botlogo} alt="Logo" />
      </div>

      <nav>
        <div className="nav-label">{isAdmin ? 'Admin' : 'Menu'}</div>
        {navItems.map(({ page, icon, label }) => (
          <button
            key={page}
            className={`nav-item${activePage === page ? ' active' : ''}`}
            onClick={() => onNavigate(page)}
          >
            <span className="ni" style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="u-avatar">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="avatar" />
          ) : (
            (user?.displayName || user?.email || 'U')[0].toUpperCase()
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="u-name">{user?.displayName || 'Usuário'}</div>
          <div className="u-email">{user?.email || ''}</div>
        </div>
        <button className="u-logout" onClick={handleLogout} title="Sair" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconLogout size={17} />
        </button>
      </div>
    </aside>
  );
}