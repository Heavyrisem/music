import { PresenceInfo, RP } from 'discord-rich-presence';

const discordRichPresence = require('discord-rich-presence');

/**
 * Initializes a Discord Rich Presence client.
 *
 * @param {string} clientId - The client ID of the Discord Rich Presence client.
 * @returns {RP} The initialized Discord Rich Presence client.
 */
export const initializeDiscordRPC = (clientId: string): RP => {
  return discordRichPresence(clientId);
};

/**
 * Updates the Discord Rich Presence with the specified new state.
 *
 * @param {RP} client - The Discord Rich Presence client.
 * @param {Partial<PresenceInfo>} newState - The new state to update the Rich Presence with.
 * @returns {void}
 */
export const updateDiscordRP = (client: RP, newState: Partial<PresenceInfo>): void => {
  client.updatePresence(newState);
};