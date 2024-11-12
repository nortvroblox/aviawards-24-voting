import type { LoadedController } from "client/player/loaded-controller";
import { $NODE_ENV } from "rbxts-transform-env";

import type CategoriesController from "./categories-controller";
import type ConfettiController from "./confetti-controller";

export function reactConfig(): void {
	if ($NODE_ENV !== "development") {
		return;
	}

	_G.__DEV__ = true;
	_G.__PROFILE__ = false;

	// Avoid implicit React import before setting the __DEV__ flag
	void import("client/ui/functions/profiler").then(({ profileAllComponents }) => {
		profileAllComponents();
	});
}

export async function createApp(environment: {
	categoriesController: CategoriesController;
	confettiController: ConfettiController;
	loadedController: LoadedController;
}): Promise<void> {
	// Avoid implicit React import before setting the __DEV__ flag
	const React = await import("@rbxts/react");
	const { App } = await import("client/ui/app");
	const { mount } = await import("client/ui/functions");

	mount({ key: "app", children: <App env={environment} /> });
}
