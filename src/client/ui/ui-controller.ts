import { Players, StarterGui } from "@rbxts/services";

import ConfettiController from "./confetti-controller";
import { Controller } from "@flamework/core";
import EmitYourParticleModule from '../../shared/modules/emit-your-particles';
import type { LoadedController } from "../player/loaded-controller";
import type { Logger } from "@rbxts/log";
import type { OnStart } from "@flamework/core";
import { PLAYER_GUI } from "client/constants";
import { createApp } from "./react-config";

@Controller({})
export default class UIController implements OnStart {
	constructor(
		private readonly logger: Logger,
		private readonly loadedController: LoadedController,
        private readonly confettiController: ConfettiController
	) {}

	public onStart(): void {
		// remove default ui
		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);

		createApp({ loadedController: this.loadedController, confettiController: this.confettiController }).catch(() => {
			this.logger.Fatal(`Failed to create React app!`);
		});
	}
}
