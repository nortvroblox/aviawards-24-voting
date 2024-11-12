import { StarterGui } from "@rbxts/services";

import ConfettiController from "./confetti-controller";
import { Controller } from "@flamework/core";
import type { LoadedController } from "../player/loaded-controller";
import type { Logger } from "@rbxts/log";
import type { OnStart } from "@flamework/core";
import { createApp } from "./react-config";
import CategoriesController from "./categories-controller";

@Controller({})
export default class UIController implements OnStart {
	constructor(
		private readonly logger: Logger,
		private readonly loadedController: LoadedController,
        private readonly confettiController: ConfettiController,
        private readonly categoriesController: CategoriesController
	) {}

	public onStart(): void {
		// remove default ui
		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);

		createApp({ loadedController: this.loadedController, confettiController: this.confettiController, categoriesController: this.categoriesController }).catch(() => {
			this.logger.Fatal(`Failed to create React app!`);
		});
	}
}
