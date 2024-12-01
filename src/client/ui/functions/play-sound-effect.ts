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

const Cheer = new Instance("Sound");
Cheer.Name = "Cheer";
Cheer.RollOffMode = Enum.RollOffMode.InverseTapered;
Cheer.SoundId = "rbxassetid://9067086084";
Cheer.Parent = LocalPlayer.WaitForChild("PlayerGui");

Click.Volume = 0.001;
Click.Play()
Hover.Volume = 0.001;
Hover.Play()
Cheer.Volume = 0.001;
Cheer.Play()

export function playSoundEffect(sound: "click" | "hover" | "cheer") {
    const newSound = sound === "click" ? Click : sound === "hover" ? Hover : Cheer;
    const newSoundClone = newSound.Clone();
    newSoundClone.TimePosition = 0;
    newSoundClone.Volume = 0.5;
    newSoundClone.Parent = LocalPlayer.WaitForChild("PlayerGui");
    newSoundClone.PlayOnRemove = true;
    newSoundClone.Destroy();
}