// src/pages/SubscriptionsPage.jsx
import {
  Play,
  RotateCw,
  Square,
  Logs,
  Bot,
  Cpu,
  MemoryStick,
  RefreshCw,
  X,
} from 'lucide-react';

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const IconPix = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L7 7H4V10L2 12L4 14V17H7L12 22L17 17H20V14L22 12L20 10V7H17L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBoleto = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 9V15M8 9V15M11 9V15M13 9V15M16 9V15M18 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCreditCard = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5" />
    <rect x="5" y="13" width="4" height="2" rx="0.5" fill="currentColor" />
  </svg>
);

const IconClock = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconDocument = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="17" x2="16" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconMoney = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7V17M9 9.5C9 8.67 10.34 8 12 8C13.66 8 15 8.67 15 9.5C15 10.33 13.66 11 12 11C10.34 11 9 11.67 9 12.5C9 13.33 10.34 14 12 14C13.66 14 15 13.33 15 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCheckCircle = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCopy = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconPrint = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9V2H18V9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="2" y="9" width="20" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="18" cy="12" r="1" fill="currentColor" />
  </svg>
);

const IconLink = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.53087C19.5521 2.6038 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60704C11.7643 9.26326 11.0685 9.05891 10.3533 9.00769C9.63816 8.95647 8.92037 9.05966 8.24864 9.31023C7.5769 9.5608 6.96689 9.95297 6.46 10.46L3.46 13.46C2.54921 14.403 2.04524 15.666 2.0566 16.977C2.06796 18.288 2.59377 19.5421 3.52084 20.4691C4.44791 21.3962 5.70199 21.922 7.01297 21.9334C8.32395 21.9448 9.58697 21.4408 10.53 20.53L12.24 18.82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconTrash = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6L18 20C18 20.5304 17.7893 21.0391 17.4142 21.4142C17.0391 21.7893 16.5304 22 16 22H8C7.46957 22 6.96086 21.7893 6.58579 21.4142C6.21071 21.0391 6 20.5304 6 20L5 6H19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconEdit = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRocket = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 16.5C3 17.76 2.5 21.5 2.5 21.5C2.5 21.5 6.24 21 7.5 19.5C8.21 18.66 8.2 17.37 7.41 16.59C7.02 16.21 6.5 16 5.96 16C5.41 16.01 4.89 16.21 4.5 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15L9 12C9.79 10.26 10.97 8.72 12.44 7.49C14.69 5.62 17.5 4.5 20.5 4.5C20.5 7.5 19.38 10.31 17.51 12.56C16.28 14.03 14.74 15.21 13 16L12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12H4C4 12 4.7 9.5 6.5 8L9 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15V20C12 20 14.5 19.3 16 17.5L12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRefresh = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4V10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 20V14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.49 9C19.9828 7.56677 19.1209 6.28509 17.9845 5.27501C16.8482 4.26493 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7351 6.01547 18.725C4.87913 17.7149 4.01717 16.4332 3.51 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStar = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const IconArrowLeft = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClose = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useLog } from '../context/LogContext';
import './SubscriptionsPage.css';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCpfCnpj(value) {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

// ─── Modal de Cobrança Asaas ─────────────────────────────────────────────────

function BillingModal({ sub, onClose }) {
  const { toast } = useToast();

  // 'loading_charges' → busca faturas em aberto
  // 'existing'        → mostra fatura pendente encontrada
  // 'choose'          → escolhe método de pagamento
  // 'form'            → preenche dados
  // 'result'          → exibe resultado gerado
  const [step, setStep] = useState('loading_charges');
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [existingCharge, setExistingCharge] = useState(null);
  const [paid, setPaid] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const pollRef = useRef(null);

  // ── Polling: verifica status após gerar cobrança ──────────────────────────
  useEffect(() => {
    if (step !== 'result' || paid) return;

    // Cartão confirma na hora, não precisa polling
    if (method === 'CREDIT_CARD') {
      setPaid(true);
      return;
    }

    let attempts = 0;
    const MAX = 60; // ~5 minutos (60 × 5s)

    pollRef.current = setInterval(async () => {
      attempts++;
      setPollCount(attempts);
      try {
        if (!sub.dashboardEmail) return; // guard: evita URL malformada
        const subData = await api(`/api/subscriptions/by-email/${sub.dashboardEmail}`);
        // Filtra pelo guildId correto para não confirmar pagamento de outra assinatura
        const match = Array.isArray(subData)
          ? subData.find((s) => s.guildId === sub.guildId)
          : subData?.guildId === sub.guildId ? subData : null;
        if (match?.paymentStatus === 'paid') {
          clearInterval(pollRef.current);
          setPaid(true);
          toast('Pagamento confirmado! Assinatura renovada.', 'success');
        }
      } catch { /* silencia erros de polling */ }

      if (attempts >= MAX) clearInterval(pollRef.current);
    }, 5000);

    return () => clearInterval(pollRef.current);
  }, [step, paid, method, sub.dashboardEmail]);

  // Limpa polling ao fechar
  function handleClose() {
    clearInterval(pollRef.current);
    onClose();
  }

  // Dados do formulário
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [ownerName, setOwnerName] = useState('');

  // Dados de cartão (só para CREDIT_CARD)
  const [card, setCard] = useState({
    holderName: '',
    number: '',
    expiry: '',
    ccv: '',
  });

  // ── Busca faturas pendentes ao abrir ──────────────────────────────────────
  useEffect(() => {
    async function fetchPending() {
      try {
        const charges = await api(`/api/billing/${sub.guildId}`);
        const pending = charges.find(
          (c) => c.status === 'PENDING' || c.status === 'OVERDUE'
        );
        if (pending) {
          setExistingCharge(pending);
          setStep('existing');
        } else {
          setStep('choose');
        }
      } catch {
        // Se falhar ao buscar, vai direto pro fluxo normal
        setStep('choose');
      }
    }
    fetchPending();
  }, [sub.guildId]);

  // ── Cancelar fatura existente ─────────────────────────────────────────────
  async function handleCancelCharge() {
    if (!confirm('Cancelar esta fatura e gerar uma nova?')) return;
    setLoading(true);
    try {
      await api(`/api/billing/cancel/${existingCharge.chargeId}`, 'DELETE');
      toast('Fatura cancelada!', 'success');
      setExistingCharge(null);
      setStep('choose');
    } catch (e) {
      toast(`Erro ao cancelar: ${e.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }

  // ── Selecionar método ─────────────────────────────────────────────────────
  function handleMethodSelect(m) {
    setMethod(m);
    setStep('form');
  }

  // ── Gerar nova cobrança ───────────────────────────────────────────────────
  async function handleSubmit() {
    const rawCpf = cpfCnpj.replace(/\D/g, '');
    if (!ownerName.trim()) {
      toast('Informe o nome completo.', 'error');
      return;
    }
    if (rawCpf.length < 11) {
      toast('CPF/CNPJ inválido.', 'error');
      return;
    }
    if (method === 'CREDIT_CARD') {
      if (!card.holderName || !card.number || !card.expiry || !card.ccv) {
        toast('Preencha todos os dados do cartão.', 'error');
        return;
      }
      const expiryDigits = card.expiry.replace(/\D/g, '');
      if (expiryDigits.length !== 6) {
        toast('Validade inválida. Use o formato MM/AAAA (ex: 08/2027).', 'error');
        return;
      }
      const expMonth = parseInt(expiryDigits.slice(0, 2), 10);
      if (expMonth < 1 || expMonth > 12) {
        toast('Mês de validade inválido.', 'error');
        return;
      }
    }

    setLoading(true);
    try {
      const body = {
        guildId: sub.guildId,
        ownerName: ownerName.trim(),
        ...(sub.dashboardEmail ? { ownerEmail: sub.dashboardEmail } : {}),
        cpfCnpj: rawCpf,
        amount: sub.price,
        billingType: method,
        description: `Assinatura ${sub.guildName || sub.guildId} - 30 dias`,
      };

      if (method === 'CREDIT_CARD') {
        const [expMonth, expYear] = card.expiry.split('/');
        body.creditCard = {
          holderName: card.holderName,
          number: card.number.replace(/\s/g, ''),
          expiryMonth: expMonth?.trim(),
          expiryYear: expYear?.trim(),
          ccv: card.ccv,
        };
        body.creditCardHolderInfo = {
          name: ownerName.trim(),
          cpfCnpj: rawCpf,
          ...(sub.dashboardEmail ? { email: sub.dashboardEmail } : {}),
          // phone, postalCode e addressNumber devem ser preenchidos pelo backend
          // caso a conta Asaas exija esses campos — verificar server.js
        };
      }

      const data = await api('/api/billing/create', 'POST', body);
      setResult(data);
      setStep('result');
    } catch (e) {
      toast(`Erro: ${e.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast('Copiado!', 'success');
    } catch {
      toast('Não foi possível copiar.', 'error');
    }
  }

  const METHOD_LABELS = {
    PIX: { icon: <IconPix size={24} />, label: 'PIX', desc: 'Pagamento instantâneo' },
    BOLETO: { icon: <IconBoleto size={24} />, label: 'Boleto', desc: 'Vence em 3 dias úteis' },
    CREDIT_CARD: { icon: <IconCreditCard size={24} />, label: 'Cartão de Crédito', desc: 'Débito imediato' },
  };

  const BILLING_ICONS = {
    PIX: <IconPix size={20} />,
    BOLETO: <IconBoleto size={20} />,
    CREDIT_CARD: <IconCreditCard size={20} />,
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: 480, width: '100%' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            {step === 'loading_charges' && <><IconClock size={18} /> Verificando faturas...</>}
            {step === 'existing' && <><IconDocument size={18} /> Fatura em Aberto</>}
            {step === 'choose' && <><IconMoney size={18} /> Gerar Cobrança</>}
            {step === 'form' && <>{METHOD_LABELS[method]?.icon} Pagar via {METHOD_LABELS[method]?.label}</>}
            {step === 'result' && <><IconCheckCircle size={18} /> Cobrança Gerada</>}
          </h3>
          <button
            className="btn btn-sm btn-danger"
            onClick={handleClose}
            style={{ padding: '4px 10px' }}
          >
            <IconClose size={14} />
          </button>
        </div>

        {/* ── Identidade do bot ── */}
        <div style={{ background: 'var(--bg3, #1e1e2e)', borderRadius: 10, marginBottom: 20, overflow: 'hidden' }}>
          {sub.botBannerUrl && (
            <img
              src={sub.botBannerUrl}
              alt="banner"
              style={{ width: '100%', height: 64, objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px' }}>
            {(sub.botImgPerfil || sub.botAvatar) ? (
              <img
                src={sub.botImgPerfil || sub.botAvatar}
                alt="bot"
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling && (e.currentTarget.nextSibling.style.display = 'flex'); }}
              />
            ) : null}
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              display: (sub.botImgPerfil || sub.botAvatar) ? 'none' : 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg3)', color: 'var(--text3)',
            }}>
              <Bot size={20} />
            </div>
            <span style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {sub.guildName || sub.guildId}
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700, color: 'var(--green)', flexShrink: 0 }}>
              R$ {Number(sub.price || 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* ── STEP: LOADING ── */}
        {step === 'loading_charges' && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, padding: '20px 0', color: 'var(--text3)' }}>
            <div className="spin" />
            Verificando faturas em aberto...
          </div>
        )}

        {/* ── STEP: FATURA EXISTENTE ── */}
        {step === 'existing' && existingCharge && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Info da fatura */}
            <div style={{
              background: 'var(--bg3, #1e1e2e)',
              borderRadius: 10,
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              border: '1px solid var(--yellow, #f0a500)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 20, display: 'flex', alignItems: 'center' }}>{BILLING_ICONS[existingCharge.billingType] || <IconDocument size={20} />}</span>
                <span style={{ fontWeight: 600, color: 'var(--text2)' }}>
                  {existingCharge.billingType === 'PIX' && 'PIX'}
                  {existingCharge.billingType === 'BOLETO' && 'Boleto Bancário'}
                  {existingCharge.billingType === 'CREDIT_CARD' && 'Cartão de Crédito'}
                </span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: existingCharge.status === 'OVERDUE' ? 'var(--red, #e74c3c)' : 'var(--yellow, #f0a500)',
                  color: '#fff',
                }}>
                  {existingCharge.status === 'OVERDUE' ? 'VENCIDA' : 'PENDENTE'}
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text3)' }}>
                Valor: <strong style={{ color: 'var(--green)' }}>R$ {Number(existingCharge.value || 0).toFixed(2)}</strong>
              </div>
              {existingCharge.dueDate && (
                <div style={{ fontSize: 13, color: 'var(--text3)' }}>
                  Vencimento: <strong style={{ color: 'var(--text2)' }}>
                    {new Date(existingCharge.dueDate + 'T12:00:00').toLocaleDateString('pt-BR')}
                  </strong>
                </div>
              )}
            </div>

            {/* PIX pendente — mostra QR Code */}
            {existingCharge.billingType === 'PIX' && existingCharge.pixQrCode && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <img
                  src={`data:image/png;base64,${existingCharge.pixQrCode}`}
                  alt="QR Code PIX"
                  style={{ width: 180, height: 180, borderRadius: 10, border: '3px solid var(--green)' }}
                />
                {existingCharge.pixPayload && (
                  <>
                    <p style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', margin: 0 }}>
                      Ou use o PIX Copia e Cola:
                    </p>
                    <div style={{
                      background: 'var(--bg3)',
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: 11,
                      fontFamily: 'var(--mono)',
                      wordBreak: 'break-all',
                      color: 'var(--text2)',
                      maxHeight: 80,
                      overflowY: 'auto',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}>
                      {existingCharge.pixPayload}
                    </div>
                    <button className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={() => copyToClipboard(existingCharge.pixPayload)}>
                      <IconCopy size={14} /> Copiar código PIX
                    </button>
                  </>
                )}
              </div>
            )}

            {/* BOLETO pendente — link para visualizar */}
            {existingCharge.billingType === 'BOLETO' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {existingCharge.bankSlipUrl && (
                  <a
                    href={existingCharge.bankSlipUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <IconPrint size={14} /> Visualizar / Imprimir Boleto
                  </a>
                )}
                {existingCharge.invoiceUrl && (
                  <a
                    href={existingCharge.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <IconLink size={14} /> Link da Fatura
                  </a>
                )}
              </div>
            )}

            {/* Botão cancelar e gerar nova */}
            <button
              className="btn btn-danger"
              onClick={handleCancelCharge}
              disabled={loading}
              style={{ marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              {loading ? <><IconClock size={14} /> Cancelando...</> : <><IconTrash size={14} /> Cancelar e gerar nova cobrança</>}
            </button>

          </div>
        )}

        {/* ── STEP: CHOOSE ── */}
        {step === 'choose' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(METHOD_LABELS).map(([key, { icon, label, desc }]) => (
              <button
                key={key}
                className="btn"
                onClick={() => handleMethodSelect(key)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', textAlign: 'left', fontSize: 15 }}
              >
                <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 400 }}>{desc}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── STEP: FORM ── */}
        {step === 'form' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            <div className="form-group">
              <label>Nome completo *</label>
              <input
                type="text"
                placeholder="Como está no CPF/CNPJ"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>CPF / CNPJ *</label>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))}
                maxLength={18}
              />
            </div>

            {method === 'CREDIT_CARD' && (
              <>
                <div className="form-group">
                  <label>Nome no cartão *</label>
                  <input
                    type="text"
                    placeholder="Como impresso no cartão"
                    value={card.holderName}
                    onChange={(e) => setCard({ ...card, holderName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Número do cartão *</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={card.number}
                    maxLength={19}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                      const formatted = v.replace(/(\d{4})(?=\d)/g, '$1 ');
                      setCard({ ...card, number: formatted });
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div className="form-group">
                    <label>Validade *</label>
                    <input
                      type="text"
                      placeholder="MM/AAAA"
                      value={card.expiry}
                      maxLength={7}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '').slice(0, 6);
                        if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
                        setCard({ ...card, expiry: v });
                      }}
                    />
                    {card.expiry && card.expiry.length > 0 && card.expiry.replace(/\D/g, '').length < 6 && (
                      <span style={{ fontSize: 11, color: 'var(--red, #e74c3c)', marginTop: 2 }}>
                        Use o formato MM/AAAA (ex: 08/2027)
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      placeholder="000"
                      value={card.ccv}
                      maxLength={4}
                      onChange={(e) => setCard({ ...card, ccv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    />
                  </div>
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <button
                className="btn"
                onClick={handleSubmit}
                disabled={loading}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                {loading
                  ? <><IconClock size={14} /> {method === 'PIX' ? 'Gerando QR Code...' : 'Gerando...'}</>
                  : <><IconRocket size={14} /> Gerar Cobrança</>
                }
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setStep('choose')}
                disabled={loading}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <IconArrowLeft size={14} /> Voltar
              </button>
            </div>

            {loading && method === 'PIX' && (
              <p style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', margin: 0 }}>
                O QR Code PIX pode levar alguns segundos para ser gerado...
              </p>
            )}
          </div>
        )}

        {/* ── STEP: RESULT ── */}
        {step === 'result' && result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* PIX */}
            {method === 'PIX' && result.pixData && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                {result.pixData.encodedImage && (
                  <img
                    src={`data:image/png;base64,${result.pixData.encodedImage}`}
                    alt="QR Code PIX"
                    style={{ width: 200, height: 200, borderRadius: 12, border: '3px solid var(--green)' }}
                  />
                )}
                {result.pixData.payload && (
                  <>
                    <p style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', margin: 0 }}>
                      Ou copie o código PIX Copia e Cola:
                    </p>
                    <div style={{
                      background: 'var(--bg3)',
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: 11,
                      fontFamily: 'var(--mono)',
                      wordBreak: 'break-all',
                      color: 'var(--text2)',
                      maxHeight: 80,
                      overflowY: 'auto',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}>
                      {result.pixData.payload}
                    </div>
                    <button className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={() => copyToClipboard(result.pixData.payload)}>
                      <IconCopy size={14} /> Copiar código PIX
                    </button>
                  </>
                )}
                {!result.pixData.payload && (
                  <p style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center' }}>
                    QR Code indisponível no momento. Tente novamente em instantes.
                  </p>
                )}
              </div>
            )}

            {/* BOLETO */}
            {method === 'BOLETO' && result.charge && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ color: 'var(--text2)', fontSize: 14, margin: 0 }}>
                  Boleto gerado com vencimento em{' '}
                  <strong>
                    {result.charge.dueDate
                      ? new Date(result.charge.dueDate + 'T12:00:00').toLocaleDateString('pt-BR')
                      : '—'}
                  </strong>.
                </p>
                {result.charge.bankSlipUrl && (
                  <a
                    href={result.charge.bankSlipUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <IconPrint size={14} /> Visualizar / Imprimir Boleto
                  </a>
                )}
                {result.charge.invoiceUrl && (
                  <a
                    href={result.charge.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <IconLink size={14} /> Link da Fatura
                  </a>
                )}
              </div>
            )}

            {/* CARTÃO */}
            {method === 'CREDIT_CARD' && result.charge && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: 'var(--green)' }}>
                  <IconCheckCircle size={48} />
                </div>
                <p style={{ color: 'var(--text2)', margin: 0, fontWeight: 600 }}>
                  Pagamento com cartão processado!
                </p>
                <p style={{ color: 'var(--text3)', fontSize: 13, marginTop: 6 }}>
                  Status: <strong>{result.charge.status}</strong>
                </p>
              </div>
            )}

            {/* Indicador de aguardando pagamento */}
            {!paid && method !== 'CREDIT_CARD' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 10,
                background: 'var(--bg3, #1e1e2e)',
                border: '1px solid var(--yellow, #f0a500)',
                fontSize: 13,
                color: 'var(--text3)',
              }}>
                <div className="spin" style={{ flexShrink: 0 }} />
                <span>Aguardando confirmação do pagamento... ({pollCount > 0 ? `verificação ${pollCount}` : 'iniciando'})</span>
              </div>
            )}

            {/* Pagamento confirmado */}
            {paid && method !== 'CREDIT_CARD' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 10,
                background: 'var(--bg3, #1e1e2e)',
                border: '1px solid var(--green)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--green)',
              }}>
                <IconCheckCircle size={18} /> Pagamento confirmado! Assinatura renovada.
              </div>
            )}

            <button className="btn btn-sm" onClick={handleClose} style={{ marginTop: 4 }}>
              Fechar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ─── SubscriptionsPage ───────────────────────────────────────────────────────

export default function SubscriptionsPage({
  refreshTrigger,
  filter: externalFilter,
}) {
  const { user, isAdmin, subscription: linkedSub } = useAuth();
  const { toast } = useToast();
  const { addLog } = useLog();

  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(externalFilter || null);

  // Modal edição (admin)
  const [editing, setEditing] = useState(null);

  // Modal cobrança Asaas (usuário comum)
  const [billing, setBilling] = useState(null);

  // Rastreia avatares com erro de carregamento
  const [avatarErrors, setAvatarErrors] = useState({});

  // Hoje — atualiza toda meia-noite para recalcular dias restantes
  const [today, setToday] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    const msUntilMidnight = midnight - now;

    const timeout = setTimeout(() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      setToday(d);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [today]);

  // ── Filtro de status — só para cliente ──────────────────────────────────
  const [clientStatusFilter, setClientStatusFilter] = useState('all');

  const load = useCallback(async (f) => {
    setLoading(true);
    try {
      if (!isAdmin) {
        // Cliente: busca todas as assinaturas vinculadas ao e-mail
        if (user?.email) {
          try {
            const data = await api(`/api/subscriptions/by-email/${user.email}`);
            const arr = Array.isArray(data) ? data : data ? [data] : [];
            setSubs(arr);
            addLog('api', 'info', `${arr.length} assinatura(s) carregada(s) para ${user.email}`);
          } catch {
            // fallback para linkedSub
            if (linkedSub) {
              setSubs([linkedSub]);
              addLog('api', 'info', `Assinatura carregada para ${linkedSub.dashboardEmail}`);
            } else {
              setSubs([]);
              addLog('api', 'warn', 'Nenhuma assinatura vinculada a este e-mail');
            }
          }
        } else if (linkedSub) {
          setSubs([linkedSub]);
          addLog('api', 'info', `Assinatura carregada para ${linkedSub.dashboardEmail}`);
        } else {
          setSubs([]);
          addLog('api', 'warn', 'Nenhuma assinatura vinculada a este e-mail');
        }
        setLoading(false);
        return;
      }

      let data = await api('/api/subscriptions');
      if (f) data = data.filter((s) => s.paymentStatus === f);
      setSubs(data);
      addLog('api', 'info', `${data.length} assinaturas carregadas`);
    } catch (e) {
      setSubs([]);
      addLog('api', 'error', e.message);
    } finally {
      setLoading(false);
    }
  }, [addLog, isAdmin, linkedSub, user]);

  useEffect(() => {
    load(externalFilter || filter);
  }, [load, refreshTrigger, externalFilter]);

  // ── RENOVAR (admin) ──────────────────────────────────────────────────────

  async function registerPayment(guildId, price) {
    if (!confirm(`Registrar pagamento de R$ ${price} para ${guildId}?`)) return;
    try {
      const r = await api('/api/payments', 'POST', {
        guildId,
        amount: price,
        paymentMethod: 'manual',
      });
      toast(r.message || 'Pagamento registrado!', 'success');
      load(filter);
    } catch (e) {
      toast(`Erro: ${e.message}`, 'error');
    }
  }

  // ── DELETE (admin) ───────────────────────────────────────────────────────

  async function deleteSub(guildId) {
    if (!confirm(`Deletar assinatura de ${guildId}?`)) return;
    try {
      await api(`/api/subscriptions/${guildId}`, 'DELETE');
      toast('Assinatura removida', 'success');
      load(filter);
    } catch (e) {
      toast(`Erro: ${e.message}`, 'error');
    }
  }

  // ── UPDATE (admin) ───────────────────────────────────────────────────────

  async function setPremium(guildId) {
    if (!confirm('Tornar esta assinatura PREMIUM (gratuita, sem data de expiração)?')) return;
    try {
      await api(`/api/subscriptions/${guildId}`, 'PUT', {
        price: 0,
        paymentStatus: 'paid',
        startDate: null,
        endDate: null,
      });
      toast('Assinatura definida como PREMIUM!', 'success');
      load(filter);
    } catch (e) {
      toast(`Erro: ${e.message}`, 'error');
    }
  }

  async function saveEdit() {
    try {
      await api(`/api/subscriptions/${editing.guildId}`, 'PUT', {
        price: editing.price,
        paymentStatus: editing.paymentStatus,
        startDate: editing.startDate,
        endDate: editing.endDate,
      });
      toast('Assinatura atualizada!', 'success');
      setEditing(null);
      load(filter);
    } catch (e) {
      toast(`Erro: ${e.message}`, 'error');
    }
  }

  const STATUS_CLS = {
    paid: 'sub-status-paid',
    pending: 'sub-status-pending',
    expired: 'sub-status-expired',
  };

  const STATUS_LABEL = {
    paid: 'Pago',
    pending: 'Pendente',
    expired: 'Expirado',
  };

  return (
    <div>

      {/* HEADER */}
      <div className="section-header">
        <div className="section-title">Assinaturas</div>
        <button className="btn btn-sm" onClick={() => load(filter)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <IconRefresh size={14} /> Recarregar
        </button>
      </div>

      {/* FILTRO DE STATUS — só para cliente com múltiplos bots */}
      {!isAdmin && !loading && subs.length > 1 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text3)', marginRight: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Filtrar:
          </span>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'paid', label: 'Pagos' },
            { id: 'pending', label: 'Pendentes' },
            { id: 'expired', label: 'Expirados' },
          ].map(f => {
            const count = f.id === 'all' ? subs.length : subs.filter(s => s.paymentStatus === f.id).length;
            return (
              <button
                key={f.id}
                className={`dc-tab${clientStatusFilter === f.id ? ' active' : ''}`}
                onClick={() => setClientStatusFilter(f.id)}
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                {f.label}
                <span style={{ marginLeft: 5, fontSize: 10, background: 'var(--bg3)', borderRadius: 10, padding: '1px 5px' }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* GRID */}
      <div className="subs-grid">

        {loading && (
          <div className="loading">
            <div className="spin" />
            Buscando...
          </div>
        )}

        {!loading && subs.length === 0 && (
          <div className="loading" style={{ color: 'var(--text3)' }}>
            Nenhuma assinatura encontrada
          </div>
        )}

        {!loading && (isAdmin ? subs : subs.filter(s => clientStatusFilter === 'all' || s.paymentStatus === clientStatusFilter)).map((s) => {
          const end = s.endDate
            ? new Date(s.endDate).toLocaleDateString('pt-BR')
            : '—';
          const stCls = STATUS_CLS[s.paymentStatus] || 'badge-offline';

          const daysLeft = (() => {
            if (!s.endDate || Number(s.price || 0) === 0) return null;
            const endDay = new Date(s.endDate);
            endDay.setHours(0, 0, 0, 0);
            const diff = Math.ceil((endDay - today) / (1000 * 60 * 60 * 24));
            return diff;
          })();

          const avatar =
            s.botImgPerfil ||
            s.botAvatar ||
            null;

          const banner = s.botBannerUrl || null;

          return (
            <div className="sub-card" key={s.guildId}>

              {/* BANNER + AVATAR SOBREPOSTO */}
              {banner ? (
                <div className="sub-banner-wrap">
                  <img
                    src={banner}
                    alt="banner"
                    className="sub-banner"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="bot"
                      className="sub-avatar"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="sub-avatar fallback-avatar">
                      <Bot size={20} />
                    </div>
                  )}
                </div>
              ) : null}

              {/* CORPO DO CARD */}
              <div className={`sub-card-body${banner ? ' has-banner' : ''}`}>

                {/* AVATAR sem banner */}
                {!banner && (
                  avatar && !avatarErrors[s.guildId] ? (
                    <img
                      src={avatar}
                      alt="bot"
                      className="sub-avatar"
                      onError={() => setAvatarErrors((prev) => ({ ...prev, [s.guildId]: true }))}
                    />
                  ) : (
                    <div className="sub-avatar fallback-avatar">
                      <Bot size={20} />
                    </div>
                  )
                )}

                {/* INFO */}
                <div className="sub-info">
                  <div className="sub-name">{s.guildName || s.guildId}</div>
                  <div className="sub-meta">
                    ID: {s.guildId}
                    {' · '}
                    Bot: {s.botId || '—'}
                    {s.startDate && (
                      <>
                        {' · '}
                        Início: {new Date(s.startDate).toLocaleDateString('pt-BR')}
                      </>
                    )}
                    {s.endDate && Number(s.price || 0) > 0 && (
                      <>
                        {' · '}
                        Vence: {end}
                        {' · '}
                        <span style={{
                          fontWeight: 600,
                          color: daysLeft <= 3 ? 'var(--red, #e74c3c)' : daysLeft <= 7 ? 'var(--yellow, #f0a500)' : 'var(--green)',
                        }}>
                          {daysLeft > 0 ? `${daysLeft}d restantes` : daysLeft === 0 ? 'Vence hoje' : 'Expirado'}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* PRICE + STATUS */}
                <div className="sub-price-row" style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                  {Number(s.price || 0) > 0 && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>
                      R$ {Number(s.price || 0).toFixed(2)}
                    </span>
                  )}
                  {Number(s.price || 0) === 0 ? (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '7px 10px',
                      borderRadius: 6,
                      background: 'linear-gradient(135deg, #b8860b, #ffd700, #b8860b)',
                      color: '#1a1000',
                      letterSpacing: '0.05em',
                      boxShadow: '0 0 8px rgba(255, 215, 0, 0.4)',
                    }}>
                      <IconStar size={12} /> PREMIUM
                    </span>
                  ) : (
                    <span className={`badge ${stCls}`}>{STATUS_LABEL[s.paymentStatus] || s.paymentStatus}</span>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="sub-actions" style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                  {isAdmin ? (
                    <>
                      {Number(s.price || 0) > 0 && (
                        <button className="btn btn-sm" onClick={() => registerPayment(s.guildId, s.price || 0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <IconMoney size={13} /> Renovar
                        </button>
                      )}
                      {Number(s.price || 0) > 0 && (
                        <button className="btn btn-sm" onClick={() => setPremium(s.guildId)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <IconStar size={13} /> Premium
                        </button>
                      )}
                      <button className="btn btn-sm" onClick={() => setEditing({ ...s })} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <IconEdit size={13} /> Editar
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteSub(s.guildId)} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <IconTrash size={13} />
                      </button>
                    </>
                  ) : (
                    Number(s.price || 0) > 0 && (
                      <button className="btn btn-sm" onClick={() => setBilling(s)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <IconCreditCard size={13} /> Gerar Cobrança
                      </button>
                    )
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL EDIÇÃO (admin) */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Editar assinatura</h3>

            <div className="form-group">
              <label>Preço</label>
              <input
                type="number"
                value={editing.price || ''}
                onChange={(e) => setEditing({ ...editing, price: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={editing.paymentStatus}
                onChange={(e) => setEditing({ ...editing, paymentStatus: e.target.value })}
              >
                <option value="paid">paid</option>
                <option value="pending">pending</option>
                <option value="expired">expired</option>
              </select>
            </div>

            <div className="form-group">
              <label>Data início</label>
              <input
                type="date"
                value={editing.startDate?.slice(0, 10) || ''}
                onChange={(e) => setEditing({ ...editing, startDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Data final</label>
              <input
                type="date"
                value={editing.endDate?.slice(0, 10) || ''}
                onChange={(e) => setEditing({ ...editing, endDate: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn" onClick={saveEdit}>Salvar</button>
              <button className="btn btn-danger" onClick={() => setEditing(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL COBRANÇA ASAAS (usuário comum) */}
      {billing && (
        <BillingModal
          sub={billing}
          onClose={() => setBilling(null)}
        />
      )}

    </div>
  );
}