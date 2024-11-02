import { ASSETS_FOLDER, LocalPlayer } from "client/constants";
import type { OnInit, OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";

import { Controller } from "@flamework/core";
import { shuffle } from "@rbxts/sift/out/Array";

const HEIGHT_BASE = 0.8;
const HEIGHT_RANGE = 0.1;
const ANIMATION_SPEED_BASE = 1;
const ANIMATION_SPEED_RANGE = 0.2;
const RANDOM_SEED = os.clock();
const DEFAULT_ANIMATION_LENGTH = 8;

interface Clothes {
	Pants: number;
	Shirt: number;
}
interface AnimationInfo {
	Animation?: Animation;
	AnimationId: number;
	Name: string;
}

const ANIMATIONS: Array<AnimationInfo> = [
	{
		AnimationId: 121540837218427,
		Name: "AgreeingAnim",
	},
	{
		AnimationId: 116726525651586,
		Name: "HappyIdle",
	},
	{
		AnimationId: 104999625609736,
		Name: "BreathingIdle",
	},
	{
		AnimationId: 84805502955199,
		Name: "Talking",
	},
];

const NOMINEE_CLOTHES: Array<Clothes> = shuffle([
	{
		Pants: 113820352640540,
		Shirt: 125840600269688,
	},
	{
		Pants: 98408179337660,
		Shirt: 130434443056010,
	},
	{
		Pants: 137742000562293,
		Shirt: 85093917237528,
	},
	{
		Pants: 113820352640540,
		Shirt: 120775491681813,
	},
	{
		Pants: 98408179337660,
		Shirt: 120775491681813,
	},
]);
const AUDIENCE_CLOTHES: Array<Clothes> = shuffle([
	{
		Pants: 144076760,
		Shirt: 382538059,
	},
	{
		Pants: 7244112054,
		Shirt: 301809996,
	},
	{
		Pants: 2564365004,
		Shirt: 7244110473,
	},
	{
		Pants: 382538503,
		Shirt: 9945109685,
	},
	{
		Pants: 4637601297,
		Shirt: 7020213212,
	},
]);

@Controller()
export class NPCController implements OnStart, OnInit {
	/** This.cameraRefPart. */
	private NPCRigsFolder!: NPCRigs;
	private DefaultRig!: DefaultRig;
	private DefaultPlayerDescription!: HumanoidDescription;
	public isNPCLoaded = false;

	private genRandomScaleHumanoidDesc(): HumanoidDescription {
		const npcDescription = this.DefaultPlayerDescription.Clone();
		// Reset the NPC's appearance and set the clothes
		npcDescription.BodyTypeScale = 1;
		npcDescription.DepthScale = 1;
		npcDescription.HeadScale = 1;
		npcDescription.HeightScale = HEIGHT_BASE - math.random() * HEIGHT_RANGE;
		npcDescription.ProportionScale = 1;
		npcDescription.WidthScale = 1;

		return npcDescription;
	}

	private createNpc(
		location: CFrame,
		description: HumanoidDescription
	): { Humanoid: Humanoid } & Model {
		const npcRig = this.DefaultRig.Clone();
		const humanoid = npcRig.Humanoid;
		npcRig.PivotTo(location);
		npcRig.HumanoidRootPart.Anchored = true;
		npcRig.Parent = Workspace;
		humanoid.ApplyDescription(description);
		for (const state of Enum.HumanoidStateType.GetEnumItems()) {
			if (state === Enum.HumanoidStateType.None) {
				continue;
			}
			humanoid.SetStateEnabled(state, false);
		}

		return npcRig;
	}

	private lastClothesIndex = 0;
	private selectRandomClothesFromList(clothesList: Array<Clothes>): Clothes {
		this.lastClothesIndex = this.lastClothesIndex + 1;
		if (this.lastClothesIndex >= clothesList.size()) {
			this.lastClothesIndex = 0;
		}

		return (
			clothesList[this.lastClothesIndex] ?? {
				Pants: 123,
				Shirt: 123,
			}
		);
	}

	private lastAnimationIndex = 0;
	private selectRandomAnimationFromList(
		animationsList: Array<AnimationInfo>
	): { Animation: Animation } & AnimationInfo {
		this.lastAnimationIndex = this.lastAnimationIndex + 1;
		if (this.lastAnimationIndex >= animationsList.size()) {
			this.lastAnimationIndex = 0;
		}

		const selectedAnimation = animationsList[this.lastAnimationIndex];
		if (!selectedAnimation?.Animation) {
			return {
				Animation: new Instance("Animation"),
				AnimationId: 123,
				Name: "123",
			};
		}

		return {
			Animation: selectedAnimation.Animation,
			AnimationId: selectedAnimation.AnimationId,
			Name: selectedAnimation.Name,
		};
	}

	public onInit(): void {
		const npcRigsFolder = Workspace.WaitForChild("NPC_Rigs") as NPCRigs;
		const defaultRig = ASSETS_FOLDER.WaitForChild(
			"DefaultRig"
		) as DefaultRig;
		const defaultPlayerDescription =
			Players.GetHumanoidDescriptionFromUserId(LocalPlayer.UserId);
		defaultPlayerDescription.WaistAccessory = "";
		defaultPlayerDescription.NeckAccessory = "";
		defaultPlayerDescription.FrontAccessory = "";
		defaultPlayerDescription.BackAccessory = "";
		defaultPlayerDescription.ShouldersAccessory = "";

		this.NPCRigsFolder = npcRigsFolder;
		this.DefaultPlayerDescription = defaultPlayerDescription;
		this.DefaultRig = defaultRig;
		defaultRig.Humanoid.DisplayDistanceType =
			Enum.HumanoidDisplayDistanceType.None;

		// convert all ANIMATIONS to Animation
		for (const animation of ANIMATIONS) {
			animation.AnimationId = animation.AnimationId;
			const animationObject = new Instance("Animation");
			animationObject.Name = animation.Name;
			animationObject.AnimationId = `rbxassetid://${animation.AnimationId}`;
			animation.Animation = animationObject;
		}
	}

	public onStart(): void {
		const allHumanoids = new Array<Humanoid>();
		for (const npc of this.NPCRigsFolder.Nominees.GetChildren() as Array<RigPlaceholder>) {
			const npcDescription = this.genRandomScaleHumanoidDesc();
			const clothes = this.selectRandomClothesFromList(NOMINEE_CLOTHES);
			npcDescription.Shirt = clothes.Shirt;
			npcDescription.Pants = clothes.Pants;

			const npcModel = this.createNpc(
				npc.HumanoidRootPart.GetPivot(),
				npcDescription
			);
			npcModel.Parent = this.NPCRigsFolder.Nominees;
			allHumanoids.push(npcModel.Humanoid);
		}

		for (const npc of this.NPCRigsFolder.Audience.GetChildren() as Array<RigPlaceholder>) {
			const npcDescription = this.genRandomScaleHumanoidDesc();
			const clothes = this.selectRandomClothesFromList(AUDIENCE_CLOTHES);
			npcDescription.Shirt = clothes.Shirt;
			npcDescription.Pants = clothes.Pants;

			const npcModel = this.createNpc(
				npc.HumanoidRootPart.GetPivot(),
				npcDescription
			);
			npcModel.Parent = this.NPCRigsFolder.Audience;
			allHumanoids.push(npcModel.Humanoid);
		}

		for (let index = 0; index < allHumanoids.size(); index++) {
			const humanoid = allHumanoids[index];
			if (!humanoid) {
				continue;
			}

			const animation = this.selectRandomAnimationFromList(ANIMATIONS);
			const animator = humanoid.WaitForChild("Animator") as Animator;
			const animationTrack = animator.LoadAnimation(animation.Animation);
			animationTrack.AdjustSpeed(
				math.noise(index, RANDOM_SEED) * ANIMATION_SPEED_RANGE +
					ANIMATION_SPEED_BASE
			);
			animationTrack.Looped = true;
			animationTrack.Play();
			animationTrack.TimePosition =
				math.noise(index + 1, RANDOM_SEED) *
				(animationTrack.Length === 0
					? DEFAULT_ANIMATION_LENGTH
					: animationTrack.Length);
		}

		this.isNPCLoaded = true;
	}
}
