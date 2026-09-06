import {
  Play,
  RotateCw,
  Square,
  Logs,
  Bot,
  RefreshCw,
  X,
} from 'lucide-react';

import { useCallback, useEffect, useState } from 'react';
import { pm2, api } from '../services/api';
import { useLog } from '../context/LogContext';
import { useToast } from '../context/ToastContext';
import StatusBadge from '../components/StatusBadge';
import LogStream from '../components/LogStream';
import './OverviewPage.css';

export default function OverviewPage({ refreshTrigger }) {
  const { addLog } = useLog();
  const { toast } = useToast();

  const [bots, setBots] = useState([]);

  const [metrics, setMetrics] = useState({
    online: '—',
    total: '—',
    subs: '—',
    totalSubs: '—',
    pending: '—',
    restarts: '—',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // logs
  const [logBot, setLogBot] = useState(null);
  const [botLogLines, setBotLogLines] = useState([]);
  const [logLoading, setLogLoading] = useState(false);

  // =========================
  // LOAD DASHBOARD DATA
  // =========================

  const loadData = useCallback(async () => {
    setError('');

    try {
      const [botsData, subsData] = await Promise.all([
        pm2('/bots'),
        api('/api/subscriptions').catch(() => []),
      ]);

      let online = 0;
      let restarts = 0;

      botsData.forEach((b) => {
        if (b.status === 'online') online++;
        restarts += b.restarts || 0;
      });

      const paid = subsData.filter(
        (s) => s.paymentStatus === 'paid'
      ).length;

      const pending = subsData.filter(
        (s) => s.paymentStatus === 'pending'
      ).length;

      // 🔥 JOIN CORRETO (AQUI É O QUE FALTAVA)
      const mergedBots = botsData.map((bot) => {
        const sub = subsData.find(
          (s) => s.pm2AppName === bot.name
        );

        return {
          ...bot,

          // 👇 IMAGEM DO BOT (PRIORIDADE BANCO)
          botImgPerfil:
            sub?.botImgPerfil ||
            bot.botImgPerfil ||
            bot.botAvatar ||
            null,

          botBannerUrl:
            sub?.botBannerUrl ||
            bot.botBannerUrl ||
            null,

          // opcional (debug útil)
          subscription: sub || null,
        };
      });

      setBots(mergedBots);

      setMetrics({
        online,
        total: botsData.length,
        subs: paid,
        totalSubs: subsData.length,
        pending,
        restarts,
      });

    } catch (e) {
      setError(e.message);

      addLog('pm2-api', 'error', e.message);
    } finally {
      setLoading(false);
    }
  }, [addLog]);

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadData();
  }, [loadData, refreshTrigger]);

  // =========================
  // AUTO REFRESH DASHBOARD
  // =========================

  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, [loadData]);

  // =========================
  // AUTO REFRESH LOGS
  // =========================

  useEffect(() => {
    if (!logBot) return;

    const interval = setInterval(() => {
      fetchLogs(logBot, true);
    }, 2000);

    return () => clearInterval(interval);
  }, [logBot]);

  // =========================
  // BOT ACTIONS
  // =========================

  async function botAction(action, name) {
    try {
      await pm2(`/bots/${action}/${name}`, 'POST');

      toast(`${action} → ${name}`, 'success');

      addLog(
        name,
        'info',
        `${action} executado`
      );

      setTimeout(loadData, 1200);

    } catch (e) {
      toast(
        `Erro: ${e.message}`,
        'error'
      );

      addLog(
        name,
        'error',
        e.message
      );
    }
  }

  // =========================
  // FETCH LOGS
  // =========================

  async function fetchLogs(name, silent = false) {
    if (!silent) {
      setLogLoading(true);
    }

    try {
      const data = await pm2(`/logs/${name}`);

      const raw = data.logs || [];

      setBotLogLines(raw);

    } catch (e) {
      setBotLogLines([
        `ERROR: ${e.message}`
      ]);

    } finally {
      if (!silent) {
        setLogLoading(false);
      }
    }
  }

  // =========================
  // OPEN/CLOSE LOGS
  // =========================

  async function openLogs(name) {
    // fecha se clicar novamente
    if (logBot === name) {
      setLogBot(null);
      setBotLogLines([]);
      return;
    }

    setLogBot(name);
    setBotLogLines([]);

    await fetchLogs(name);
  }

  return (
    <div>

      {/* =========================
          METRICS
      ========================== */}

      <div className="metrics">

        <div className="metric m-blue">
          <div className="metric-label">
            Bots online
          </div>

          <div className="metric-val-g">
            {metrics.online}
          </div>

          <div className="metric-sub">
            de {metrics.total} processos
          </div>
        </div>

        <div className="metric m-green">
          <div className="metric-label">
            Assinaturas ativas
          </div>

          <div className="metric-val">
            {metrics.subs}
          </div>

          <div className="metric-sub">
            de {metrics.totalSubs} totais
          </div>
        </div>

        <div className="metric m-yellow">
          <div className="metric-label">
            Pagamentos pendentes
          </div>

          <div className="metric-val-y">
            {metrics.pending}
          </div>

          <div className="metric-sub">
            aguardando pagamento
          </div>
        </div>

        <div className="metric m-red">
          <div className="metric-label">
            Restarts (total)
          </div>

          <div className="metric-val-r">
            {metrics.restarts}
          </div>

          <div className="metric-sub">
            todos os bots
          </div>
        </div>
      </div>

      {/* =========================
          HEADER
      ========================== */}

      <div className="section-header">
        <div className="section-title">
          Bots em execução
        </div>
      </div>

      {/* =========================
          BOT LIST
      ========================== */}

      <div className="bots-list">

        {loading && (
          <div className="loading">
            <div className="spin" />
            Conectando à PM2 API...
          </div>
        )}

        {error && !loading && (
          <div
            className="loading"
            style={{
              color: 'var(--red)'
            }}
          >
            ⚠ Erro ao conectar: {error}
          </div>
        )}

        {!loading && !error && bots.map((b) => (
          <div key={b.name}>

            {/* CARD */}

            <div className="bot-card">

              <div className="bot-icon">
                {b.botImgPerfil ? (
                  <img
                    src={b.botImgPerfil}
                    alt="bot"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <Bot size={20} />
                )}
              </div>

              <div className="bot-info">

                <div className="bot-name">
                  {b.name}
                  {' '}
                  <StatusBadge status={b.status} />
                  {b.subscription && Number(b.subscription.price || 0) === 0 && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '5px 10px',
                      borderRadius: '50px',
                      border: '1px solid rgba(255, 215, 0, 0.6)',
                      background: 'linear-gradient(135deg, #b8860b, #ffd700, #b8860b)',
                      color: '#1a1000',
                      letterSpacing: '0.05em',
                      boxShadow: '0 0 8px rgba(255, 215, 0, 0.4)',
                      marginLeft: 4,
                      verticalAlign: 'middle',
                    }}>
                      ★ PREMIUM
                    </span>
                  )}
                </div>

                <div className="bot-desc">
                  PID: {b.pid || '—'}
                  {' · '}
                  Uptime: {b.uptime || '—'}
                </div>
              </div>

              {/* STATS */}

              <div className="bot-stats">

                <div className="bstat">
                  <div className="bstat-val">
                    {b.cpu ?? 0}%
                  </div>

                  <div className="bstat-lbl">
                    CPU
                  </div>
                </div>

                <div className="bstat">
                  <div className="bstat-val">
                    {b.memory || '—'}
                  </div>

                  <div className="bstat-lbl">
                    RAM
                  </div>
                </div>

                <div className="bstat">
                  <div
                    className="bstat-val"
                    style={
                      b.restarts > 3
                        ? { color: 'var(--red)' }
                        : {}
                    }
                  >
                    {b.restarts}
                  </div>

                  <div className="bstat-lbl">
                    Restarts
                  </div>
                </div>

              </div>

              {/* ACTIONS */}

              <div className="bot-actions">

                <button
                  className="icon-btn success"
                  onClick={() => botAction('start', b.name)}
                  disabled={b.status === 'online'}
                  title={
                    b.status === 'online'
                      ? 'Bot já está online'
                      : 'Iniciar'
                  }
                >
                  <Play size={16} />
                </button>

                <button
                  className="icon-btn"
                  onClick={() => botAction('restart', b.name)}
                  disabled={b.status !== 'online'}
                  title="Reiniciar"
                >
                  <RotateCw size={16} />
                </button>

                <button
                  className="icon-btn danger"
                  onClick={() => botAction('stop', b.name)}
                  disabled={b.status !== 'online'}
                  title={
                    b.status !== 'online'
                      ? 'Bot já está offline'
                      : 'Parar'
                  }
                >
                  <Square size={16} />
                </button>

                <button
                  className={`icon-btn ${logBot === b.name
                    ? 'logs-active'
                    : ''
                    }`}
                  onClick={() => openLogs(b.name)}
                  title="Ver logs"
                >
                  <Logs size={16} />
                </button>

              </div>
            </div>

            {/* LOG PANEL */}

            {logBot === b.name && (
              <div className="bot-log-panel">

                <div className="bot-log-header">

                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: 'var(--accent2)',
                    }}
                  >
                    logs — {b.name}
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      gap: 6,
                    }}
                  >

                    <button
                      className="btn btn-sm"
                      onClick={() => fetchLogs(b.name)}
                    >
                      <RefreshCw size={14} />
                      Atualizar
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        setLogBot(null);
                        setBotLogLines([]);
                      }}
                    >
                      <X size={14} />
                      Fechar
                    </button>

                  </div>
                </div>

                {logLoading ? (
                  <div
                    className="loading"
                    style={{
                      padding: '16px'
                    }}
                  >
                    <div className="spin" />
                    Carregando logs...
                  </div>
                ) : (
                  <LogStream
                    lines={botLogLines}
                    height={280}
                  />
                )}

              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}