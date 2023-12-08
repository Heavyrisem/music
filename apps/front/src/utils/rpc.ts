import discordRichPresence, { PresenceInfo, RP } from 'discord-rich-presence';

/**
 * Initializes a Discord Rich Presence client.
 *
 * @param {string} clientId - The client ID of the Discord Rich Presence client.
 * @returns {RP} The initialized Discord Rich Presence client.
 */
export const setupDiscordRPC = (clientId: string): RP => discordRichPresence(clientId);

/**
 * Updates the Discord Rich Presence with the specified new state.
 *
 * @param {RP} client - The Discord Rich Presence client.
 * @param {Partial<PresenceInfo>} newState - The new state to update the Rich Presence with.
 * @returns {void}
 */
export const refreshDiscordRP = (client: RP, newState: Partial<PresenceInfo>): void =>
  client.updatePresence(newState);
