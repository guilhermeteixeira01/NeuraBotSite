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

import { useDevToolsBlocker } from '../../NeuraBot/src/hooks/useDevToolsBlocker';
import BlockScreen from '../../NeuraBot/src/components/ui/BlockScreen';

export default function App() {
  const [blocked, setBlocked] = useState(false);

  const handleOpen = useCallback(() => setBlocked(true), []);
  const handleClose = useCallback(() => setBlocked(false), []);

  useDevToolsBlocker({ onOpen: handleOpen, onClose: handleClose });

  // Enquanto DevTools estiver aberto, mostra tela de bloqueio
  if (blocked) return <BlockScreen />;

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