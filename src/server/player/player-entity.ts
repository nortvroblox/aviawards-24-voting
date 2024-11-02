import type { Data } from "../../shared/data-template";
import type { Janitor } from "@rbxts/janitor";
import { Profile } from "@rbxts/profileservice/globals";

export default class PlayerEntity {
	/** The player's username. */
	public readonly name: string;
	public readonly userId: string;
	/** A string representation of the player's UserId. */

	constructor(
		public readonly player: Player,
		public readonly janitor: Janitor,
		public readonly document: Profile<Data>
	) {
		this.name = player.Name;
		this.userId = tostring(player.UserId);
	}
}
