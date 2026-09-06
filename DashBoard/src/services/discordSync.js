// src/services/discordSync.js
const SYNC_BASE = import.meta.env.VITE_SYNC_URL || 'https://dadosdc.neurabot.com.br';
const API_KEY = import.meta.env.VITE_API_SECRET || '';

async function syncFetch(path, options = {}) {
    const res = await fetch(`${SYNC_BASE}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            ...(options.headers || {}),
        },
    });
    if (!res.ok) throw new Error(`Sync server ${res.status}`);
    return res.json();
}

/** Retorna canais, membros e cargos de um servidor específico */
export async function getGuildData(guildId) {
    return syncFetch(`/api/discord-sync/${guildId}`);
}

/** Envia mensagem para um canal específico do servidor.
 *  @param {string} guildId
 *  @param {string} channelId
 *  @param {string} message  - conteúdo de texto (pode ser vazio string se só usar embed)
 *  @param {object|null} embed - objeto de embed Discord (opcional)
 */
export async function sendChannelMessage(guildId, channelId, message, embed = null) {
    return syncFetch(`/api/channel-message`, {
        method: 'POST',
        body: JSON.stringify({
            guildId,
            channelId,
            message: message?.trim() || '\u200B', // espaço invisível se só usar embed
            ...(embed ? { embed } : {}),
        }),
    });
}