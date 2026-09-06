// src/pages/DiscordServerPage.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useLog } from '../context/LogContext';
import { getGuildData, sendChannelMessage } from '../services/discordSync';
import { api } from '../services/api';
import { Bot } from 'lucide-react';

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const IconHash = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 9H20M4 15H20M10 3L8 21M16 3L14 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const IconVolume = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <path d="M15.54 8.46C16.48 9.4 17 10.67 17 12C17 13.33 16.48 14.6 15.54 15.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19.07 4.93C20.95 6.81 22 9.35 22 12C22 14.65 20.95 17.19 19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const IconFolder = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 19C22 19.53 21.79 20.04 21.41 20.41C21.04 20.79 20.53 21 20 21H4C3.47 21 2.96 20.79 2.59 20.41C2.21 20.04 2 19.53 2 19V5C2 4.47 2.21 3.96 2.59 3.59C2.96 3.21 3.47 3 4 3H9L11 6H20C20.53 6 21.04 6.21 21.41 6.59C21.79 6.96 22 7.47 22 8V19Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const IconMegaphone = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 11V13C3 14.1 3.9 15 5 15H7L10 21H12L12 15L19 18V6L12 9V3H10L7 9H5C3.9 9 3 9.9 3 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const IconList = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconChat = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15C21 15.53 20.79 16.04 20.41 16.41C20.04 16.79 19.53 17 19 17H7L3 21V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const IconServer = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="14" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
);

const IconUser = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21V19C20 17.93 19.58 16.9 18.83 16.17C18.1 15.42 17.07 15 16 15H8C6.93 15 5.9 15.42 5.17 16.17C4.42 16.9 4 17.93 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const IconTag = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.59 13.41L13.42 20.58C13.23 20.77 13 20.92 12.75 21.02C12.5 21.12 12.23 21.17 11.96 21.17C11.69 21.17 11.42 21.12 11.17 21.02C10.92 20.92 10.69 20.77 10.5 20.58L2 12.09V2H12.09L20.59 10.5C20.97 10.89 21.18 11.41 21.18 11.95C21.18 12.49 20.97 13.02 20.59 13.41Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" />
    </svg>
);

const IconWarning = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.29 3.86L1.82 18C1.64 18.31 1.55 18.67 1.55 19.03C1.55 19.39 1.64 19.74 1.82 20.05C2 20.36 2.26 20.62 2.57 20.8C2.88 20.98 3.23 21.07 3.59 21.07H20.41C20.77 21.07 21.12 20.98 21.43 20.8C21.74 20.62 22 20.36 22.18 20.05C22.36 19.74 22.45 19.39 22.45 19.03C22.45 18.67 22.36 18.31 22.18 18L13.71 3.86C13.53 3.55 13.27 3.3 12.96 3.12C12.65 2.95 12.3 2.86 11.95 2.86C11.6 2.86 11.25 2.95 10.94 3.12C10.63 3.3 10.37 3.55 10.29 3.86Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
    </svg>
);

const IconClose = ({ size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const IconChevronDown = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IconRefresh = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4V10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 20V14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.49 9C19.98 7.57 19.12 6.28 17.98 5.27C16.85 4.26 15.47 3.56 13.99 3.22C12.51 2.89 10.97 2.93 9.5 3.36C8.04 3.78 6.71 4.56 5.64 5.64L1 10M23 14L18.36 18.36C17.29 19.44 15.96 20.22 14.5 20.64C13.03 21.07 11.49 21.11 10.01 20.78C8.52 20.44 7.15 19.74 6.01 18.73C4.88 17.71 4.02 16.43 3.51 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Canal icons mapeados por tipo
const CHANNEL_ICON_MAP = {
    0: <IconHash size={13} />,
    2: <IconVolume size={13} />,
    4: <IconFolder size={13} />,
    5: <IconMegaphone size={13} />,
    15: <IconList size={13} />,
};

// ─── BotSelector ─────────────────────────────────────────────────────────────
// Exibe todos os bots vinculados ao cliente e permite selecionar qual visualizar

function BotSelector({ subs, selectedGuildId, onSelect }) {
    if (!subs || subs.length === 0) return null;

    return (
        <div style={{ marginBottom: 16 }}>
            {/* Label */}
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Seus bots vinculados ({subs.length})
            </div>

            {/* Cards de bot */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {subs.map((s) => {
                    const isSelected = s.guildId === selectedGuildId;
                    const avatar = s.botImgPerfil || s.botAvatar || null;
                    const isPaid = s.paymentStatus === 'paid';

                    return (
                        <button
                            key={s.guildId}
                            onClick={() => onSelect(s)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '7px 12px',
                                borderRadius: 8,
                                border: isSelected
                                    ? '1.5px solid var(--accent, #5865f2)'
                                    : '1.5px solid var(--border, #2e2e3a)',
                                background: isSelected
                                    ? 'color-mix(in srgb, var(--accent, #5865f2) 12%, transparent)'
                                    : 'var(--bg2, #16161e)',
                                cursor: 'pointer',
                                color: 'var(--text1)',
                                transition: 'all 0.15s',
                                minWidth: 0,
                                maxWidth: 130,
                            }}
                        >
                            {/* Avatar do bot */}
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt=""
                                    style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            ) : (
                                <div style={{
                                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'var(--bg3, #1e1e2e)', color: 'var(--text3)',
                                }}>
                                    <Bot size={14} />
                                </div>
                            )}

                            {/* Nome do servidor/bot */}
                            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                <span style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: isSelected ? 'var(--accent, #5865f2)' : 'var(--text1)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: 140,
                                }}>
                                    {s.guildName || s.guildId}
                                </span>
                                <span style={{ fontSize: 11, color: isPaid ? 'var(--green)' : 'var(--yellow, #f0a500)' }}>
                                    {isPaid ? '● Ativo' : '● Pendente'}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── DiscordServerPage ────────────────────────────────────────────────────────

export default function DiscordServerPage() {
    const { user, subscription: linkedSub, subscriptionLoading, isAdmin } = useAuth();
    const { toast } = useToast();
    const { addLog } = useLog();

    // ── Assinaturas do cliente ─────────────────────────────
    const [allSubs, setAllSubs] = useState([]);
    const [loadingSubs, setLoadingSubs] = useState(true);

    // ── Seleção de bot ─────────────────────────────────────
    const [selectedGuildId, setSelectedGuildId] = useState('');
    const [selectedSub, setSelectedSub] = useState(null);

    // ── Discord data ───────────────────────────────────────
    const [discordData, setDiscordData] = useState(null);
    const [loadingDiscord, setLoadingDiscord] = useState(false);
    const [discordTab, setDiscordTab] = useState('channels');
    const [discordSearch, setDiscordSearch] = useState('');

    // ── Filtro de bots ─────────────────────────────────────
    const [botFilter, setBotFilter] = useState('all'); // 'all' | 'paid' | 'pending' | 'expired'

    // ── Enviar mensagem para canal ─────────────────────────
    const [selectedChannelId, setSelectedChannelId] = useState('');
    const [channelMsg, setChannelMsg] = useState('');
    const [embedJson, setEmbedJson] = useState('');
    const [embedError, setEmbedError] = useState('');
    const [channelSearch, setChannelSearch] = useState('');
    const [sendingMsg, setSendingMsg] = useState(false);

    // ── Carrega todas as assinaturas do cliente ────────────
    const loadSubs = useCallback(async () => {
        if (user === undefined || subscriptionLoading) return;
        setLoadingSubs(true);
        try {
            if (isAdmin) {
                // Admin: carrega todas
                const data = await api('/api/subscriptions');
                setAllSubs(Array.isArray(data) ? data : []);
            } else if (user?.email) {
                // Cliente: carrega pelo e-mail
                const data = await api(`/api/subscriptions/by-email/${user.email}`);
                const arr = Array.isArray(data) ? data : data ? [data] : [];
                setAllSubs(arr);

                // Seleciona automaticamente o primeiro ativo
                if (arr.length > 0 && !selectedGuildId) {
                    const firstPaid = arr.find(s => s.paymentStatus === 'paid') || arr[0];
                    setSelectedGuildId(firstPaid.guildId);
                    setSelectedSub(firstPaid);
                }
            } else if (linkedSub) {
                setAllSubs([linkedSub]);
                setSelectedGuildId(linkedSub.guildId);
                setSelectedSub(linkedSub);
            }
        } catch {
            // Fallback: usa linkedSub do contexto
            if (linkedSub) {
                setAllSubs([linkedSub]);
                setSelectedGuildId(linkedSub.guildId);
                setSelectedSub(linkedSub);
            } else {
                setAllSubs([]);
            }
        } finally {
            setLoadingSubs(false);
        }
    }, [user, subscriptionLoading, isAdmin, linkedSub]);

    useEffect(() => { loadSubs(); }, [loadSubs]);

    // ── Carrega dados do Discord quando troca de servidor ──
    useEffect(() => {
        if (!selectedGuildId) return;
        setLoadingDiscord(true);
        setDiscordData(null);
        setDiscordSearch('');
        setSelectedChannelId('');
        setChannelMsg('');
        setEmbedJson('');
        getGuildData(selectedGuildId)
            .then(setDiscordData)
            .catch(() => toast('Erro ao carregar dados do servidor Discord', 'error'))
            .finally(() => setLoadingDiscord(false));
    }, [selectedGuildId]);

    // ── Troca de bot selecionado ───────────────────────────
    function handleSelectBot(sub) {
        if (sub.guildId === selectedGuildId) return;
        setSelectedGuildId(sub.guildId);
        setSelectedSub(sub);
        setDiscordTab('channels');
        setDiscordSearch('');
    }

    // ── Bots filtrados para o seletor ──────────────────────
    const filteredSubs = allSubs.filter(s => {
        if (botFilter === 'all') return true;
        return s.paymentStatus === botFilter;
    });

    // Canais de texto disponíveis para envio (tipo 0 = texto, tipo 5 = anúncio)
    const textChannels = (discordData?.channels || []).filter(c => c.type === 0 || c.type === 5);

    const filteredTextChannels = textChannels.filter(c =>
        c.name.toLowerCase().includes(channelSearch.toLowerCase())
    );

    // ── Listas filtradas ───────────────────────────────────
    const q = discordSearch.toLowerCase();

    const filteredChannels = (discordData?.channels || []).filter(c =>
        c.name.toLowerCase().includes(q)
    );

    const filteredMembers = (discordData?.members || []).filter(m =>
        !m.bot && (
            m.username.toLowerCase().includes(q) ||
            m.displayName.toLowerCase().includes(q)
        )
    );

    const filteredRoles = (discordData?.roles || [])
        .filter(r => r.name.toLowerCase().includes(q))
        .sort((a, b) => b.position - a.position);

    const listRef = useRef(null);

    // ── Handler: enviar mensagem para canal ───────────────
    async function handleSendChannelMsg() {
        if (!selectedChannelId) return toast('Selecione um canal', 'error');
        if (!channelMsg.trim() && !embedJson.trim()) return toast('Digite uma mensagem ou cole um embed JSON', 'error');

        let parsedEmbed = null;
        if (embedJson.trim()) {
            try {
                parsedEmbed = JSON.parse(embedJson.trim());
                setEmbedError('');
            } catch {
                setEmbedError('JSON inválido — verifique a sintaxe');
                return;
            }
        }

        setSendingMsg(true);
        try {
            await sendChannelMessage(selectedGuildId, selectedChannelId, channelMsg, parsedEmbed);
            const ch = textChannels.find(c => c.id === selectedChannelId);
            toast(`Mensagem enviada para #${ch?.name || selectedChannelId}!`, 'success');
            addLog('channel-msg', 'success', `Mensagem enviada para #${ch?.name}`);
            setChannelMsg('');
            setEmbedJson('');
            setEmbedError('');
        } catch (e) {
            toast(`Erro ao enviar: ${e.message}`, 'error');
        } finally {
            setSendingMsg(false);
        }
    }

    // ── Render ─────────────────────────────────────────────

    if (loadingSubs || subscriptionLoading) {
        return (
            <div>
                <div className="section-title" style={{ marginBottom: 16 }}>Servidor Discord</div>
                <div className="loading" style={{ padding: '16px 0' }}>
                    <div className="spin" /> Carregando bots vinculados...
                </div>
            </div>
        );
    }

    if (allSubs.length === 0) {
        return (
            <div>
                <div className="section-title" style={{ marginBottom: 16 }}>Servidor Discord</div>
                <p style={{ fontSize: 13, color: 'var(--text3)' }}>
                    Nenhuma assinatura ativa encontrada para este e-mail.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="section-header" style={{ marginBottom: 16 }}>
                <div className="section-title">Servidor Discord</div>
                <button
                    className="btn btn-sm"
                    onClick={loadSubs}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
                >
                    <IconRefresh size={13} /> Recarregar
                </button>
            </div>

            {/* ── SELETOR DE BOTS ──────────────────────────────── */}
            <div className="broadcast-box" style={{ marginBottom: 16 }}>

                {/* Filtro de status dos bots */}
                {allSubs.length > 1 && (
                    <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: 'var(--text3)', marginRight: 4 }}>Filtrar:</span>
                        {[
                            { id: 'all', label: 'Todos' },
                            { id: 'paid', label: 'Ativos' },
                            { id: 'pending', label: 'Pendentes' },
                            { id: 'expired', label: 'Expirados' },
                        ].map(f => (
                            <button
                                key={f.id}
                                className={`dc-tab${botFilter === f.id ? ' active' : ''}`}
                                onClick={() => setBotFilter(f.id)}
                                style={{ fontSize: 12, padding: '4px 10px' }}
                            >
                                {f.label}
                                {f.id !== 'all' && (
                                    <span style={{
                                        marginLeft: 5,
                                        fontSize: 10,
                                        background: 'var(--bg3)',
                                        borderRadius: 10,
                                        padding: '1px 5px',
                                    }}>
                                        {allSubs.filter(s => s.paymentStatus === f.id).length}
                                    </span>
                                )}
                                {f.id === 'all' && (
                                    <span style={{
                                        marginLeft: 5,
                                        fontSize: 10,
                                        background: 'var(--bg3)',
                                        borderRadius: 10,
                                        padding: '1px 5px',
                                    }}>
                                        {allSubs.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Cards de seleção de bot */}
                {filteredSubs.length === 0 ? (
                    <p style={{ fontSize: 13, color: 'var(--text3)', margin: 0 }}>
                        Nenhum bot com este status.
                    </p>
                ) : (
                    <BotSelector
                        subs={filteredSubs}
                        selectedGuildId={selectedGuildId}
                        onSelect={handleSelectBot}
                    />
                )}
            </div>

            {/* ── DADOS DO SERVIDOR DISCORD (do bot selecionado) ── */}
            {selectedSub && (
                <div style={{ marginTop: 4 }}>
                    <div className="broadcast-box">

                        {/* Header com identidade do bot selecionado */}
                        <div className="dc-header" style={{ marginBottom: 12 }}>
                            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                                {/* Avatar do bot selecionado */}
                                {(selectedSub.botImgPerfil || selectedSub.botAvatar) ? (
                                    <img
                                        src={selectedSub.botImgPerfil || selectedSub.botAvatar}
                                        alt=""
                                        style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }}
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                ) : (
                                    <Bot size={16} style={{ color: 'var(--text3)' }} />
                                )}
                                <IconServer size={15} />
                                {selectedSub.guildName || selectedSub.guildId}
                            </h3>
                            {discordData && (
                                <span className="dc-timestamp">
                                    Atualizado: {new Date(discordData.timestamp).toLocaleString('pt-BR')}
                                </span>
                            )}
                        </div>

                        {/* Alerta se assinatura não está paga */}
                        {selectedSub.paymentStatus !== 'paid' && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 7,
                                padding: '9px 12px',
                                borderRadius: 8,
                                background: 'color-mix(in srgb, var(--yellow, #f0a500) 10%, transparent)',
                                border: '1px solid var(--yellow, #f0a500)',
                                fontSize: 12,
                                color: 'var(--yellow, #f0a500)',
                                marginBottom: 14,
                            }}>
                                <IconWarning size={13} />
                                Assinatura {selectedSub.paymentStatus === 'pending' ? 'pendente' : 'expirada'} — dados podem estar desatualizados.
                            </div>
                        )}

                        {discordData && (
                            <div className="dc-summary">
                                {[
                                    { val: discordData.summary.totalChannels, label: 'Canais' },
                                    { val: discordData.summary.humans, label: 'Membros' },
                                    { val: discordData.summary.bots, label: 'Bots' },
                                    { val: discordData.summary.totalRoles, label: 'Cargos' },
                                ].map(({ val, label }) => (
                                    <div key={label} className="dc-stat">
                                        <span className="dc-stat-val">{val}</span>
                                        <span className="dc-stat-label">{label}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="dc-tabs">
                            {[
                                { id: 'channels', label: 'Canais', icon: <IconHash size={13} /> },
                                { id: 'members', label: 'Membros', icon: <IconUser size={13} /> },
                                { id: 'roles', label: 'Cargos', icon: <IconTag size={13} /> },
                            ].map(t => (
                                <button
                                    key={t.id}
                                    className={`dc-tab${discordTab === t.id ? ' active' : ''}`}
                                    onClick={() => { setDiscordTab(t.id); setDiscordSearch(''); if (listRef.current) listRef.current.scrollTop = 0; }}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
                                >
                                    {t.icon}{t.label}
                                </button>
                            ))}
                        </div>

                        {discordData && (
                            <input
                                className="field-input dc-search"
                                placeholder={
                                    discordTab === 'channels' ? 'Buscar canal...' :
                                        discordTab === 'members' ? 'Buscar membro...' : 'Buscar cargo...'
                                }
                                value={discordSearch}
                                onChange={(e) => setDiscordSearch(e.target.value)}
                            />
                        )}

                        {loadingDiscord ? (
                            <div className="loading" style={{ padding: '16px 0' }}>
                                <div className="spin" /> Carregando dados do Discord...
                            </div>
                        ) : !discordData ? (
                            <p className="dc-empty">
                                Nenhum dado sincronizado ainda. Aguarde o bot enviar os dados.
                            </p>
                        ) : (
                            <div className="dc-list" ref={listRef}>

                                {discordTab === 'channels' && (
                                    filteredChannels.length === 0
                                        ? <p className="dc-empty">Nenhum canal encontrado.</p>
                                        : filteredChannels.map(c => (
                                            <div key={c.id} className={`dc-item${c.type === 4 ? ' dc-item--category' : ''}`}>
                                                <span className="dc-item-icon" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                                                    {CHANNEL_ICON_MAP[c.type] || <IconHash size={13} />}
                                                </span>
                                                <div className="dc-item-info">
                                                    <span
                                                        className="dc-item-name"
                                                        style={{ fontVariantEmoji: 'text', WebkitFontSmoothing: 'antialiased' }}
                                                    >
                                                        {c.name}
                                                    </span>
                                                    {c.topic && (
                                                        <span className="dc-item-meta" title={c.topic}>
                                                            {c.topic.slice(0, 40)}{c.topic.length > 40 ? '…' : ''}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                )}

                                {discordTab === 'members' && (
                                    filteredMembers.length === 0
                                        ? <p className="dc-empty">Nenhum membro encontrado.</p>
                                        : filteredMembers.map(m => (
                                            <div key={m.id} className="dc-item">
                                                <img
                                                    src={m.avatar}
                                                    alt=""
                                                    className="dc-avatar"
                                                    onError={e => { e.target.src = 'https://cdn.discordapp.com/embed/avatars/0.png'; }}
                                                />
                                                <div className="dc-item-info">
                                                    <span className="dc-item-name">{m.displayName}</span>
                                                    <span className="dc-item-meta">@{m.username}</span>
                                                </div>
                                                <div className="dc-roles-wrap">
                                                    {m.roles.slice(0, 3).map(r => (
                                                        <span key={r.id} className="dc-role-badge">{r.name}</span>
                                                    ))}
                                                    {m.roles.length > 3 && (
                                                        <span className="dc-role-badge">+{m.roles.length - 3}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                )}

                                {discordTab === 'roles' && (
                                    filteredRoles.length === 0
                                        ? <p className="dc-empty">Nenhum cargo encontrado.</p>
                                        : filteredRoles.map(r => (
                                            <div key={r.id} className="dc-item">
                                                <span
                                                    className="dc-role-dot"
                                                    style={{ background: r.color === '#000000' ? '#555' : r.color }}
                                                />
                                                <span className="dc-item-name">{r.name}</span>
                                                <span className="dc-item-meta">
                                                    {r.memberCount} membro{r.memberCount !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        ))
                                )}

                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}