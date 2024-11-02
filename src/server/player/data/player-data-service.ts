import { Events, Functions } from "server/network";
import { OnStart, Service } from "@flamework/core";

import { DATA_TEMPLATE } from "../../../shared/data-template";
import type { Data } from "../../../shared/data-template";
import KickCode from "types/enum/kick-reason";
import type PlayerRemovalService from "../player-removal-service";
import { Players } from "@rbxts/services";
import type { Profile } from "@rbxts/profileservice/globals";
import ProfileService from "@rbxts/profileservice";

export interface OnPlayerAdded {
	onPlayerAdded(player: Player): void;
}

export interface OnPlayerRemoved {
	onPlayerRemoved(player: Player): void;
}

@Service({})
export class PlayerDataService implements OnStart {
	private readonly store = ProfileService.GetProfileStore(
		"VotingStore",
		DATA_TEMPLATE
	);

	private profiles: Record<number, Profile<Data> | undefined> = {};
    private loadingProfiles: Record<number, boolean> = {};

	constructor(private readonly playerRemovalService: PlayerRemovalService) {}

	public async loadProfile(
		player: Player
	): Promise<Profile<Data> | undefined> {
		return new Promise((resolve, reject) => {
            if (this.profiles[player.UserId] || this.loadingProfiles[player.UserId]) {
                while (this.profiles[player.UserId] === undefined) {
                    task.wait();
                }
                resolve(this.profiles[player.UserId]);
                return;
            }
            
            this.loadingProfiles[player.UserId] = true;
			const profile = this.store.LoadProfileAsync(
				`Player_${player.UserId}`
			);
			if (profile !== undefined) {
				profile.AddUserId(player.UserId);
				profile.Reconcile();
				profile.ListenToRelease(() => {
					this.profiles[player.UserId] = undefined;
					this.playerRemovalService.removeForBug(
						player,
						KickCode.PlayerProfileReleased
					);
				});
				if (player.IsDescendantOf(Players)) {
					this.profiles[player.UserId] = profile;
					print(`Loaded profile for ${player.UserId}`);
					resolve(profile);
				} else {
					print(`Failed to load profile for ${player.UserId}`);
					profile.Release();
					resolve(undefined);
				}
                this.loadingProfiles[player.UserId] = false;
			} else {
				print(`Failed to load profile for ${player.UserId}`);
				reject(`Failed to load profile for ${player.UserId}`);
                this.loadingProfiles[player.UserId] = false;
			}
		});
	}

	public unloadProfile(player: Player): void {
		const profile = this.profiles[player.UserId];
		if (profile) {
			profile.Release();
		}
        if (this.loadingProfiles[player.UserId]) {
            this.loadingProfiles[player.UserId] = false;
        }
	}

    onStart(): void {
        Functions.GetPlayerData.setCallback(async (player?) => {
            if (!player) {
                return DATA_TEMPLATE;
            }
            
            const profile = await this.loadProfile(player);
            if (profile) {
                return profile.Data;
            }
            this.playerRemovalService.removeForBug(player, KickCode.PlayerProfileUndefined);
            return DATA_TEMPLATE;
        });

        Events.SetPlayerData.connect(async (player, data) => {
            const profile = await this.loadProfile(player);
            if (profile) {
                profile.Data = data;
            } else {
                this.playerRemovalService.removeForBug(player, KickCode.PlayerProfileUndefined);
            }
        });
    }
}

export default PlayerDataService;
