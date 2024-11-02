import KickCode from "types/enum/kick-reason";
import type { Logger } from "@rbxts/log";
import { Service } from "@flamework/core";

/** This handles removing the player from the game for various reasons. */
@Service({})
export default class PlayerRemovalService {
	constructor(private readonly logger: Logger) {}

	/**
	 * Removes a player from the server due to a bug.
	 *
	 * @param player - The player to remove.
	 * @param code - The reason the player was removed.
	 */
	public removeForBug(player: Player, code: KickCode): void {
		this.logger.Warn(
			`Removing ${player.UserId} due to bug: ${this.toMessage(code)}`
		);
		player.Kick(this.toMessage(code));
	}

	/**
	 * Removes a player from the server due to a security issue.
	 *
	 * @param player - The player to remove.
	 * @param code - The reason the player was removed.
	 */
	public removeForSecurity(player: Player, code: KickCode): void {
		this.logger.Warn(
			`Removing ${player.UserId} due to: ${this.toMessage(code)}`
		);
		player.Kick(this.toMessage(code));
	}

	/**
	 * Returns a message corresponding to the given kick code.
	 *
	 * @param code - The kick code to generate a message for.
	 * @returns A message corresponding to the given kick code.
	 */

	public toMessage(code: KickCode): string {
		switch (code) {
			case KickCode.PlayerProfileUndefined: {
				return `Your player profile is undefined. Please rejoin the game.`;
			}
			case KickCode.PlayerProfileReleased: {
				return `Your player profile has been released. Please rejoin the game.`;
			}
			case KickCode.PlayerFullServer: {
				return `The server is full. Please try again later.`;
			}
			case KickCode.PlayerInstantiationError: {
				return `An error occurred while instantiating your player. Please rejoin the game.`;
			}
			case KickCode.PlayerInvalidFingerprint: {
				return `Something has gone wrong with your initial connection. Please try again. (SS-001)`;
			}
			case KickCode.PlayerFingerprintTimeout: {
				return `Something has gone wrong with your initial connection. Please try again. (SS-002)`;
			}
			case KickCode.PlayerFingerprintDuplicate: {
				return `Something has gone wrong with your initial connection. Please try again. (SS-003)`;
			}
			case KickCode.PlayerNoAffiliatedGroup: {
				return `There's an issue with the server connection. Please try again later. (SS-004)`;
			}
			case KickCode.PlayerNotVerifiedId: {
				return `There's an issue with the server connection. Please try again later. (SS-005)`;
			}
			case KickCode.PlayerNotVerified: {
				return `There's an issue with the server connection. Please try again later. (SS-006)`;
			}
			case KickCode.PlayerAccountAge: {
				return `There's an issue with the server connection. Please try again later. (SS-007)`;
			}
		}
	}
}
