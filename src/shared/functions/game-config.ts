import Log from "@rbxts/log";
import { $NODE_ENV } from "rbxts-transform-env";

export enum GameId {
	Development = 6410070454,
	Production = 6410067266,
}

function IsGameId(value: number): value is GameId {
	return value in GameId;
}

export function getConfigValueForGame<const T>(
	gameIdToValueTable: Record<GameId, T>
): T {
	if ($NODE_ENV === "development" && game.PlaceId === 0) {
		return gameIdToValueTable[GameId.Development];
	}

	if (!IsGameId(game.GameId)) {
		Log.Warn(
			`Invalid game id for place: ${game.GameId}, falling back to development config`
		);
		return gameIdToValueTable[GameId.Development];
	}

	return gameIdToValueTable[game.GameId];
}
