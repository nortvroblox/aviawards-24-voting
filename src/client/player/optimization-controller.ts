import { Players, StarterGui } from "@rbxts/services";

import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";

const DEFAULT_PLAYER_SCRIPTS_NAMES = [
	"PlayerScriptsLoader",
	"RbxCharacterSounds",
	"PlayerModule",
	"ChatScript",
	"BubbleChat",
];

const DEFAULT_PLAYER_GUIS_NAMES = ["BubbleChat", "Chat"];
const CHARACTER_SCRIPTS_NAMES = ["Animate", "Health"];

@Controller()
export class OptimizationController implements OnStart {
	public onStart(): void {
		const localPlayer = Players.LocalPlayer;
		if (!localPlayer.Character) {
			localPlayer.CharacterAdded.Wait();
		}

		for (const scriptName of DEFAULT_PLAYER_SCRIPTS_NAMES) {
			const robloxScript = localPlayer
				.WaitForChild("PlayerScripts")
				.WaitForChild(scriptName);
			robloxScript.Destroy();
		}

		for (const guiName of DEFAULT_PLAYER_GUIS_NAMES) {
			const robloxGui = localPlayer
				.WaitForChild("PlayerGui")
				.WaitForChild(guiName);
			robloxGui.Destroy();
		}

		const character =
			localPlayer.Character ?? localPlayer.CharacterAdded.Wait()[0];
		for (const scriptName of CHARACTER_SCRIPTS_NAMES) {
			const robloxScript = character.WaitForChild(scriptName);
			robloxScript.Destroy();
		}

		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);
	}
}
