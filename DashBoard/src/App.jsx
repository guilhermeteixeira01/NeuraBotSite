// src/App.jsx
import { useState, useCallback } from 'react';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';

import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import OverviewPage from './pages/OverviewPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import NotificationsPage from './pages/NotificationsPage';
import DatabasePage from './pages/DatabasePage';
import DiscordServerPage from './pages/DiscordServerPage';

export default function App() {
  console.log(
    "%cPARE SEU SAFADO !",
    "color: #ffcc00; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;"
  );

  console.log(
    "%cEsta é uma funcionalidade do navegador destinada a desenvolvedores. Se alguém te disse para copiar e colar algo aqui para ativar um recurso ou 'hackear' a conta de alguém, isso é uma fraude e pode dar a essa pessoa acesso à sua conta.",
    "color: #ff3333; font-size: 16px; font-weight: bold;"
  );

  console.log(
    "%cNunca cole código aqui que você não entende completamente.",
    "color: #ffffff; background: #cc0000; font-size: 14px; padding: 4px;"
  );
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  // Admin começa em 'overview', usuário comum em 'subscriptions'
  const [activePage, setActivePage] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [subsFilter, setSubsFilter] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Loading enquanto Firebase verifica auth + isAdmin
  if (user === undefined || (user && isAdmin === undefined)) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text3)' }}>
        <div className="spin" style={{ marginRight: 10 }} /> Carregando...
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  // Define página inicial baseada no role (só na primeira vez)
  const currentPage = activePage ?? (isAdmin ? 'overview' : 'subscriptions');

  function handleNavigate(page) {
    setActivePage(page);
    setSubsFilter(null);
    setSidebarOpen(false);
  }

  function handleRefresh() {
    setRefreshTrigger((n) => n + 1);
    toast('Atualizando...', 'info');
  }

  function handleNavigateToSubs(filter) {
    setSubsFilter(filter);
    setActivePage('subscriptions');
    setSidebarOpen(false);
  }

  return (
    <div className="layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        activePage={currentPage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isAdmin={isAdmin}
      />

      <div className="main">
        <Topbar
          activePage={currentPage}
          onRefresh={handleRefresh}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
        />
        <div className="content">
          {currentPage === 'overview' && isAdmin && (
            <OverviewPage refreshTrigger={refreshTrigger} isAdmin={isAdmin} />
          )}
          {currentPage === 'subscriptions' && (
            <SubscriptionsPage
              refreshTrigger={refreshTrigger}
              filter={subsFilter}
              isAdmin={isAdmin}
            />
          )}
          {currentPage === 'notifications' && (
            <NotificationsPage isAdmin={isAdmin} />
          )}
          {currentPage === 'discordServer' && (
            <DiscordServerPage isAdmin={isAdmin} />
          )}
          {currentPage === 'database' && isAdmin && (
            <DatabasePage refreshTrigger={refreshTrigger} onNavigateToSubs={handleNavigateToSubs} />
          )}
        </div>
      </div>
    </div>
  );
}
