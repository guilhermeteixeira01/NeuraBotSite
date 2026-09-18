// src/services/discordSync.js
import { api } from './api';

/** Retorna canais, membros e cargos de um servidor específico */
export async function getGuildData(guildId) {
  return api(`/api/discord-sync/${guildId}`);
}

/** Envia mensagem para um canal específico do servidor.
 *  @param {string} guildId
 *  @param {string} channelId
 *  @param {string} message  - conteúdo de texto (pode ser vazio string se só usar embed)
 *  @param {object|null} embed - objeto de embed Discord (opcional)
 */
export async function sendChannelMessage(guildId, channelId, message, embed = null) {
  return api('/api/channel-message', 'POST', {
    guildId,
    channelId,
    message: message?.trim() || '\u200B', // espaço invisível se só usar embed
    ...(embed ? { embed } : {}),
  });
}