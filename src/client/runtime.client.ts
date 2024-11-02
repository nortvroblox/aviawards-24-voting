import { Flamework, Modding } from "@flamework/core";

import { GAME_NAME } from "shared/constants";
import Log from "@rbxts/log";
import type { Logger } from "@rbxts/log";
import { reactConfig } from "./ui/react-config";
import { setupLogger } from "shared/functions/setup-logger";

function start(): void {
	reactConfig();
	setupLogger();

	Log.Info(`${GAME_NAME} client version: ${game.PlaceVersion}`);

	Modding.registerDependency<Logger>((ctor) => Log.ForContext(ctor));
	Flamework.addPaths("src/client");

	Log.Info(`Flamework ignite!`);
	Flamework.ignite();
}

start();
