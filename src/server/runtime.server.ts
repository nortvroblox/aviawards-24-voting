import { Flamework, Modding } from "@flamework/core";

import { GAME_NAME } from "shared/constants";
import Log from "@rbxts/log";
import type { Logger } from "@rbxts/log";
import { setupLogger } from "shared/functions/setup-logger";

function start(): void {
	setupLogger();

	Log.Info(`${GAME_NAME} is starting up! Version: ${game.PlaceVersion}`);

	Modding.registerDependency<Logger>((ctor) => Log.ForContext(ctor));

	Flamework.addPaths("src/server");

	Log.Info(`Flamework ignite!`);
	Flamework.ignite();
}

start();
