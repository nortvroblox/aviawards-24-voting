/* eslint-disable @cspell/spellchecker -- This is a false positive, "Scriptable" is a valid term in Roblox Lua */
import type { OnInit, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import {
	RunService,
	TweenService,
	UserInputService,
	Workspace,
} from "@rbxts/services";
import { createPortal, createRoot } from "@rbxts/react-roblox";

import { Controller } from "@flamework/core";
import type { LoadedController } from "./loaded-controller";
import PhysicalLoadingUI from "client/ui/components/physical-loading-ui";

const FALLBACK_FOV = 40;
const FULL_ANGLE = 180;
// eslint-disable-next-line ts/no-magic-numbers -- It's half
const HALF_ANGLE = FULL_ANGLE / 2;
const MOUSE_AFFECT_MODIFIER = 0.05;
const LERP_SPEED = 2;

// eslint-disable-next-line ts/no-magic-numbers -- Artistic choice, is magic number
const INIT_CAMERA_OFFSET = new CFrame(0, 10, 0).mul(
	// eslint-disable-next-line ts/no-magic-numbers -- Artistic choice, is magic number
	CFrame.Angles(math.rad(130), math.rad(15), math.rad(15))
);

@Controller()
export class CameraController implements OnStart, OnInit {
	/** This.cameraRefPart. */
	private cameraRefPart!: Part;
	private camera!: Camera;
	private physicalLoadingUIPart!: Part;

	constructor(private readonly loadedController: LoadedController) {}

	public onInit(): void {
		const physicalLoadingUIPart = new Instance("Part");
		physicalLoadingUIPart.Anchored = true;
		physicalLoadingUIPart.CanCollide = false;
		physicalLoadingUIPart.Size = new Vector3(16, 9, 1);
		physicalLoadingUIPart.Position = new Vector3(0, 0, 0);
		physicalLoadingUIPart.Transparency = 1;
		physicalLoadingUIPart.Parent = Workspace;

		const physicalUIRoot = createRoot(physicalLoadingUIPart);
		physicalUIRoot.render(
			createPortal(
				<StrictMode>
					<surfacegui
						CanvasSize={new Vector2(2560, 1440)}
						LightInfluence={0.5}
						MaxDistance={1e3}
						PixelsPerStud={140}
						ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
					>
						<PhysicalLoadingUI />
					</surfacegui>
				</StrictMode>,
				physicalLoadingUIPart
			)
		);

		const cameraRefPart = Workspace.WaitForChild("CameraPart") as Part;
		let camera = Workspace.CurrentCamera;
		while (!camera) {
			camera = Workspace.CurrentCamera;
			RunService.Heartbeat.Wait();
		}

		this.cameraRefPart = cameraRefPart;
		this.camera = camera;
		this.physicalLoadingUIPart = physicalLoadingUIPart;
		cameraRefPart.Parent = undefined;
	}

	private getLoadingUICFrame(
		baseCFrame: CFrame,
		cameraAngle?: CFrame
	): CFrame {
		return baseCFrame
			.mul(INIT_CAMERA_OFFSET)
			.mul(cameraAngle ?? new CFrame(0, 0, 0))
			.mul(new CFrame(0, 0, -10))
			.mul(CFrame.Angles(0, math.rad(180), 0));
	}

	public onStart(): void {
		const baseCFrame = this.cameraRefPart.CFrame;
		const updateCameraProperties: () => void = () => {
			this.camera.CameraType = Enum.CameraType.Scriptable;
			this.camera.FieldOfView =
				tonumber(this.cameraRefPart.GetAttribute("FieldOfView")) ??
				FALLBACK_FOV;
		};

		this.camera.GetPropertyChangedSignal("CameraType").Connect(() => {
			if (this.camera.CameraType !== Enum.CameraType.Scriptable) {
				updateCameraProperties();
			}
		});
		updateCameraProperties();

		this.camera.CFrame = baseCFrame.mul(INIT_CAMERA_OFFSET);

		// put in a temp cframevalue
		let cameraBaseCFrameTemp = new Instance("CFrameValue");
		cameraBaseCFrameTemp.Value = baseCFrame.mul(INIT_CAMERA_OFFSET);

		void this.loadedController.waitForLoad().then(() => {
			TweenService.Create(
				cameraBaseCFrameTemp,
				new TweenInfo(
					2,
					Enum.EasingStyle.Quint,
					Enum.EasingDirection.InOut
				),
				{
					Value: baseCFrame,
				}
			).Play();
		});

		let cameraAngle = new CFrame();
		// this.physicalLoadingUIPart.CFrame = baseCFrame.mul(INIT_CAMERA_OFFSET).mul(new CFrame(0, 0, -10)).mul(CFrame.Angles(0, math.rad(180), 0));
		this.physicalLoadingUIPart.CFrame = this.getLoadingUICFrame(baseCFrame);

		RunService.BindToRenderStep(
			"CameraController",
			Enum.RenderPriority.Camera.Value,
			(dt: number) => {
				const mousePosition = UserInputService.GetMouseLocation();
				const screenSize = this.camera.ViewportSize;

				const angle = new Vector2(
					(mousePosition.Y / screenSize.Y) * FULL_ANGLE - HALF_ANGLE,
					(mousePosition.X / screenSize.X) * FULL_ANGLE - HALF_ANGLE
				);

				cameraAngle = cameraAngle.Lerp(
					CFrame.Angles(
						math.rad(angle.X * MOUSE_AFFECT_MODIFIER),
						math.rad(angle.Y * MOUSE_AFFECT_MODIFIER),
						0
					),
					LERP_SPEED * dt
				);

				this.camera.CFrame =
					cameraBaseCFrameTemp.Value.mul(cameraAngle);

				this.physicalLoadingUIPart.CFrame =
					this.physicalLoadingUIPart.CFrame.Lerp(
						this.getLoadingUICFrame(baseCFrame, cameraAngle),
						LERP_SPEED * dt
					);
			}
		);
	}
}
