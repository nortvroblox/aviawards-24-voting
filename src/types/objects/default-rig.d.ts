type DefaultRig = {
	Animate: {
		cheer: {
			CheerAnim: Animation;
		} & StringValue;
		climb: {
			ClimbAnim: Animation;
		} & StringValue;
		dance: {
			Animation1: {
				Weight: NumberValue;
			} & Animation;
			Animation2: {
				Weight: NumberValue;
			} & Animation;
			Animation3: {
				Weight: NumberValue;
			} & Animation;
		} & StringValue;
		dance2: {
			Animation1: {
				Weight: NumberValue;
			} & Animation;
			Animation2: {
				Weight: NumberValue;
			} & Animation;
			Animation3: {
				Weight: NumberValue;
			} & Animation;
		} & StringValue;
		dance3: {
			Animation1: {
				Weight: NumberValue;
			} & Animation;
			Animation2: {
				Weight: NumberValue;
			} & Animation;
			Animation3: {
				Weight: NumberValue;
			} & Animation;
		} & StringValue;
		fall: {
			FallAnim: Animation;
		} & StringValue;
		idle: {
			Animation1: {
				Weight: NumberValue;
			} & Animation;
			Animation2: {
				Weight: NumberValue;
			} & Animation;
		} & StringValue;
		jump: {
			JumpAnim: Animation;
		} & StringValue;
		laugh: {
			LaughAnim: Animation;
		} & StringValue;
		mood: {
			Animation1: Animation;
		} & StringValue;
		PlayEmote: BindableFunction;
		point: {
			PointAnim: Animation;
		} & StringValue;
		run: {
			RunAnim: Animation;
		} & StringValue;
		ScaleDampeningPercent: NumberValue;
		sit: {
			SitAnim: Animation;
		} & StringValue;
		swim: {
			Swim: Animation;
		} & StringValue;
		swimidle: {
			SwimIdle: Animation;
		} & StringValue;
		toollunge: {
			ToolLungeAnim: Animation;
		} & StringValue;
		toolnone: {
			ToolNoneAnim: Animation;
		} & StringValue;
		toolslash: {
			ToolSlashAnim: Animation;
		} & StringValue;
		walk: {
			WalkAnim: Animation;
		} & StringValue;
		wave: {
			WaveAnim: Animation;
		} & StringValue;
	} & LocalScript;
	["Body Colors"]: BodyColors;
	Head: {
		face: Decal;
		FaceCenterAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		FaceFrontAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		HairAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		HatAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		Head: WrapTarget;
		Neck: Motor6D;
		NeckRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		OriginalSize: Vector3Value;
	} & MeshPart;
	Humanoid: {
		Animator: Animator;
		BodyDepthScale: NumberValue;
		BodyHeightScale: NumberValue;
		BodyProportionScale: NumberValue;
		BodyTypeScale: NumberValue;
		BodyWidthScale: NumberValue;
		HeadScale: NumberValue;
		HumanoidDescription: HumanoidDescription;
	} & Humanoid;
	HumanoidRootPart: {
		OriginalSize: Vector3Value;
		RootAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RootRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
	} & Part;
	LeftFoot: {
		LeftAnkle: Motor6D;
		LeftAnkleRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftFoot: WrapTarget;
		LeftFootAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		OriginalSize: Vector3Value;
	} & MeshPart;
	LeftHand: {
		LeftGripAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftHand: WrapTarget;
		LeftWrist: Motor6D;
		LeftWristRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		OriginalSize: Vector3Value;
	} & MeshPart;
	LeftLowerArm: {
		LeftElbow: Motor6D;
		LeftElbowRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftLowerArm: WrapTarget;
		LeftWristRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		OriginalSize: Vector3Value;
	} & MeshPart;
	LeftLowerLeg: {
		LeftAnkleRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftKnee: Motor6D;
		LeftKneeRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftLowerLeg: WrapTarget;
		OriginalSize: Vector3Value;
	} & MeshPart;
	LeftUpperArm: {
		LeftElbowRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftShoulder: Motor6D;
		LeftShoulderAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftShoulderRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftUpperArm: WrapTarget;
		OriginalSize: Vector3Value;
	} & MeshPart;
	LeftUpperLeg: {
		LeftHip: Motor6D;
		LeftHipRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftKneeRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftUpperLeg: WrapTarget;
		OriginalSize: Vector3Value;
	} & MeshPart;
	LowerTorso: {
		LeftHipRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LowerTorso: WrapTarget;
		OriginalSize: Vector3Value;
		RightHipRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		Root: Motor6D;
		RootRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		WaistBackAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		WaistCenterAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		WaistFrontAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		WaistRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
	} & MeshPart;
	RightFoot: {
		OriginalSize: Vector3Value;
		RightAnkle: Motor6D;
		RightAnkleRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightFoot: WrapTarget;
		RightFootAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
	} & MeshPart;
	RightHand: {
		OriginalSize: Vector3Value;
		RightGripAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightHand: WrapTarget;
		RightWrist: Motor6D;
		RightWristRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
	} & MeshPart;
	RightLowerArm: {
		OriginalSize: Vector3Value;
		RightElbow: Motor6D;
		RightElbowRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightLowerArm: WrapTarget;
		RightWristRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
	} & MeshPart;
	RightLowerLeg: {
		OriginalSize: Vector3Value;
		RightAnkleRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightKnee: Motor6D;
		RightKneeRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightLowerLeg: WrapTarget;
	} & MeshPart;
	RightUpperArm: {
		OriginalSize: Vector3Value;
		RightElbowRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightShoulder: Motor6D;
		RightShoulderAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightShoulderRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightUpperArm: WrapTarget;
	} & MeshPart;
	RightUpperLeg: {
		OriginalSize: Vector3Value;
		RightHip: Motor6D;
		RightHipRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightKneeRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightUpperLeg: WrapTarget;
	} & MeshPart;
	UpperTorso: {
		BodyBackAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		BodyFrontAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftCollarAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		LeftShoulderRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		NeckAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		NeckRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		OriginalSize: Vector3Value;
		RightCollarAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		RightShoulderRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
		UpperTorso: WrapTarget;
		Waist: Motor6D;
		WaistRigAttachment: {
			OriginalPosition: Vector3Value;
		} & Attachment;
	} & MeshPart;
} & Model;
