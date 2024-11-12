import { Categories } from './categories';
import type { Data } from './data-template';
import { Networking } from "@flamework/networking";

/** Fired by client to server. */
interface ClientToServerEvents {
    SetPlayerData(data: Data): void;
}

/** Fired by server to client. */
interface ServerToClientEvents {}

/** Functions that the server can call on the client. */
interface ServerToClientFunctions {
	GetFingerprint(): string;
}

interface ClientToServerFunctions {
    GetPlayerData(): Data;
    // GetCategories(): { [key: string]: { description: string; image: string } };
    GetCategories(): Categories;
}

export const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();
export const GlobalFunctions = Networking.createFunction<
	ClientToServerFunctions,
	ServerToClientFunctions
>();
