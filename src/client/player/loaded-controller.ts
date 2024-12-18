import { ContentProvider, RunService, Workspace } from "@rbxts/services";

import { Controller } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import type { NPCController } from "./npc-controller";
import type { OnStart } from "@flamework/core";
import assets from "shared/assets";
import { LocalPlayer } from "client/constants";
import { Functions } from "client/network";

@Controller()
export class LoadedController implements OnStart {
	public isLoaded = false;

	constructor(
		private readonly logger: Logger,
		private readonly playerRemovalService: NPCController
	) {}

	public async onStart(): Promise<void> {
		this.logger.Info("LoadedController started");
        if (!game.IsLoaded()) {
            game.Loaded.Wait();
        }

		while (!this.playerRemovalService.isNPCLoaded) {
			RunService.Heartbeat.Wait();
		}
		this.logger.Info("LoadedController: NPC loaded");

		this.logger.Info("Preloading assets");
		const assetIds: string[] = [];
		const recursiveAdd = (asset: unknown) => {
			if (typeIs(asset, "table")) {
				for (const [_, value] of pairs(asset)) {
					recursiveAdd(value);
				}
			} else if (typeIs(asset, "string")) {
				assetIds.push(asset);
			}
		};
		recursiveAdd(assets);
		ContentProvider.PreloadAsync(assetIds);
		this.logger.Info("Assets preloaded");

        const votingMusic = Workspace.WaitForChild('VotingMusic') as Sound;
        votingMusic.Parent = LocalPlayer.WaitForChild('PlayerGui') as ScreenGui;
        votingMusic.Play();

        // Functions.GetPlayerData()
        let getPlayerDataExists = false;
        while (!getPlayerDataExists) {
            try {
                const playerData = await Functions.GetPlayerData();
                this.logger.Info("Player data: ", playerData);
                getPlayerDataExists = true;
            } catch (e) {
                warn(e);
                wait(5);
            }
        }

		this.logger.Info("LoadedController finished");
		this.isLoaded = true;
	}

	public async waitForLoad(): Promise<void> {
		return new Promise((resolve) => {
			while (!this.isLoaded) {
				RunService.Heartbeat.Wait();
			}

			resolve();
		});
	}
}
