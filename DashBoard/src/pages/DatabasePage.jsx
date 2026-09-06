// src/pages/DatabasePage.jsx
import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import './DatabasePage.css';

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const IconDatabase = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 5V12C3 13.66 7.03 15 12 15C16.97 15 21 13.66 21 12V5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 12V19C3 20.66 7.03 22 12 22C16.97 22 21 20.66 21 19V12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconChart = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="7" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconRefresh = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4V10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 20V14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.49 9C19.98 7.57 19.12 6.28 17.98 5.27C16.85 4.26 15.47 3.56 13.99 3.22C12.51 2.89 10.97 2.93 9.5 3.36C8.04 3.78 6.71 4.56 5.64 5.64L1 10M23 14L18.36 18.36C17.29 19.44 15.96 20.22 14.5 20.64C13.03 21.07 11.49 21.11 10.01 20.78C8.52 20.44 7.15 19.74 5.02 18.73C4.88 18.72 4.01 16.43 3.51 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBolt = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L4.09 12.82H11L10 22L20.09 10.82H13L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function DatabasePage({ refreshTrigger, onNavigateToSubs }) {
  const { toast } = useToast();
  const [stats, setStats] = useState({ total: '—', paid: '—', pend: '—', exp: '—', revenue: '—' });
  const [queryResult, setQueryResult] = useState('');

  const loadStats = useCallback(async () => {
    try {
      const subs = await api('/api/subscriptions');
      const paid = subs.filter((s) => s.paymentStatus === 'paid');
      const pend = subs.filter((s) => s.paymentStatus === 'pending');
      const exp = subs.filter((s) => s.paymentStatus === 'expired');
      const rev = paid.reduce((acc, s) => acc + Number(s.price || 0), 0);
      setStats({
        total: subs.length,
        paid: paid.length,
        pend: pend.length,
        exp: exp.length,
        revenue: `R$ ${rev.toFixed(2)}`,
      });
      setQueryResult(`Atualizado em ${new Date().toLocaleTimeString('pt-BR')} — ${subs.length} registros`);
      toast('Stats atualizadas', 'success');
    } catch (e) {
      toast(`Erro: ${e.message}`, 'error');
    }
  }, [toast]);

  useEffect(() => { loadStats(); }, [loadStats, refreshTrigger]);

  return (
    <div>
      <div className="section-title" style={{ marginBottom: 16 }}>MySQL — informações</div>

      <div className="db-grid">
        <div className="db-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 7 }}><IconDatabase size={16} /> Conexão</h3>
          {[
            ['Host', '192.99.119.161'],
            ['Porta', '3306'],
            ['Banco', 'neurabot'],
            ['Usuário', 'neurabot'],
            ['API porta', '3301'],
          ].map(([k, v]) => (
            <div className="db-row" key={k}>
              <span className="db-row-key">{k}</span>
              <span className="db-row-val">{v}</span>
            </div>
          ))}
        </div>

        <div className="db-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 7 }}><IconChart size={16} /> Assinaturas</h3>
          <div className="db-row"><span className="db-row-key">Total</span><span className="db-row-val">{stats.total}</span></div>
          <div className="db-row"><span className="db-row-key">Pagas</span><span className="db-row-val" style={{ color: 'var(--green)' }}>{stats.paid}</span></div>
          <div className="db-row"><span className="db-row-key">Pendentes</span><span className="db-row-val" style={{ color: 'var(--yellow)' }}>{stats.pend}</span></div>
          <div className="db-row"><span className="db-row-key">Expiradas</span><span className="db-row-val" style={{ color: 'var(--red)' }}>{stats.exp}</span></div>
          <div className="db-row"><span className="db-row-key">Receita total</span><span className="db-row-val" style={{ color: 'var(--green)' }}>{stats.revenue}</span></div>
        </div>
      </div>

      <div className="broadcast-box">
        <h3 style={{ marginBottom: 12, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><IconBolt size={13} /> Query rápida via API</h3>
        <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>
          Use os filtros de assinatura abaixo — queries diretas não são suportadas pela API REST.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-sm" onClick={() => onNavigateToSubs('paid')}>Ver pagas</button>
          <button className="btn btn-sm" onClick={() => onNavigateToSubs('pending')}>Ver pendentes</button>
          <button className="btn btn-sm" onClick={() => onNavigateToSubs('expired')}>Ver expiradas</button>
          <button className="btn btn-sm" onClick={loadStats} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><IconRefresh size={13} /> Atualizar stats</button>
        </div>
        <div style={{ marginTop: 14, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text2)' }}>
          {queryResult}
        </div>
      </div>
    </div>
  );
}