import { LocalPlayer } from 'client/constants';

const Click = new Instance("Sound");
Click.Name = "Click";
Click.RollOffMode = Enum.RollOffMode.InverseTapered;
Click.SoundId = "rbxassetid://15675059323";
Click.Parent = LocalPlayer.WaitForChild("PlayerGui");

const Hover = new Instance("Sound");
Hover.Name = "Hover";
Hover.RollOffMode = Enum.RollOffMode.InverseTapered;
Hover.SoundId = "rbxassetid://10066931761";
Hover.Parent = LocalPlayer.WaitForChild("PlayerGui");

export function playSoundEffect(sound: "click" | "hover") {
    const newSound = sound === "click" ? Click : Hover;
    const newSoundClone = newSound.Clone();
    newSoundClone.Parent = LocalPlayer.WaitForChild("PlayerGui");
    newSoundClone.PlayOnRemove = true;
    newSoundClone.Destroy();
}