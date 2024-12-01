import { useViewport } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";

import { springs } from "../constants/springs";
import { playSoundEffect } from "../functions/play-sound-effect";
import { useMotion } from "../hooks";
import { defaultTheme, fonts } from "../themes";
import TickAnimated from "./tick-animated";

export interface Props<T extends Instance = TextButton> extends React.PropsWithChildren {
	ButtonTweenDelay?: number;
	Description?: string;
	Hidden?: boolean;

	/** The default properties of the component. */
	Native?: Partial<React.InstanceProps<T>>;
	OnClick?: () => void;
	Selected?: boolean;

	Thumbnail?: string;

	Title?: string;
}

const DefaultTextPadding = React.memo(() => {
	return <uipadding PaddingLeft={new UDim(0, 10)} />;
});

function Card({
	ButtonTweenDelay,
	Description,
	Hidden,
	Native,
	OnClick,
	Selected,
	Thumbnail,
	Title,
}: Readonly<Props>): JSX.Element {
	const viewportSize = useViewport();
	const [pressed, setPressed] = React.useState(false);
	const [hovered, setHovered] = React.useState(false);
	const [strokeSize, strokeSizeMotion] = useMotion(2);
	const [strokeTransparency, strokeTransparencyMotion] = useMotion(1);

	const [buttonSize, buttonSizeMotion] = useMotion(new UDim2(0.7, 0, 0.7, 0));
	const [buttonTransparency, buttonTransparencyMotion] = useMotion(1);

	const [introAnimationPlayed, setIntroAnimationPlayed] = React.useState(false);

	React.useEffect(() => {
		if (!introAnimationPlayed) {
			return;
		}

		if (Selected === true) {
			strokeSizeMotion.spring(6, springs.responsive);
			strokeTransparencyMotion.spring(0.5, springs.responsive);
			return;
		}

		strokeSizeMotion.spring(hovered ? 4 : 2, springs.responsive);
		strokeTransparencyMotion.spring(
			(Hidden ?? false) ? 1 : hovered ? 0.5 : 0.8,
			springs.responsive,
		);
	}, [
		hovered,
		strokeSizeMotion,
		strokeTransparencyMotion,
		introAnimationPlayed,
		Hidden,
		Selected,
	]);

	React.useEffect(() => {
		if (!introAnimationPlayed) {
			return;
		}

		buttonTransparencyMotion.spring((Hidden ?? false) ? 1 : 0, springs.gentle);
	}, [buttonTransparencyMotion, Hidden, introAnimationPlayed, Selected]);

	React.useEffect(() => {
		if (!introAnimationPlayed) {
			return;
		}

		if (Selected === true) {
			return;
		}

		if (pressed) {
			// buttonOffsetMotion.spring(-7, springs.responsive);
			buttonSizeMotion.spring(new UDim2(1, -15, 1, -15), springs.responsive);
		} else if (hovered) {
			// buttonOffsetMotion.spring(5, springs.responsive);
			buttonSizeMotion.spring(new UDim2(1, -5, 1, -5), springs.responsive);
		} else {
			// buttonOffsetMotion.spring(0, springs.responsive);
			buttonSizeMotion.spring(new UDim2(1, 0, 1, 0), springs.responsive);
		}
	}, [pressed, hovered, buttonSizeMotion, introAnimationPlayed, Selected]);

	React.useEffect(() => {
		task.spawn(() => {
			task.wait(ButtonTweenDelay ?? 0);
			buttonSizeMotion.spring(new UDim2(1, 0, 1, 0), springs.gentle);
			buttonTransparencyMotion.spring(0, springs.gentle);

			setIntroAnimationPlayed(true);
		});
	}, [ButtonTweenDelay, buttonTransparencyMotion, buttonSizeMotion]);

	return (
		// <frame BackgroundTransparency={1} Size={new UDim2(0.5, -10, 0.5, -10)}>
		<frame BackgroundTransparency={1} Size={new UDim2(0.5, -10, 0.5, -10)}>
			{Selected === true && (
				<TickAnimated
					Native={{
						AnchorPoint: new Vector2(0.5, 0.5),
						Position: new UDim2(0.5, 0, 0.5, 0),
						ZIndex: 2,
					}}
				/>
			)}
			<textbutton
				AnchorPoint={new Vector2(0.5, 0.5)}
				AutoButtonColor={false}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0.8}
				BorderColor3={new Color3(0, 0, 0)}
				BorderSizePixel={0}
				ClipsDescendants={true}
				Event={{
					MouseButton1Click: () => {
						playSoundEffect("click");
						OnClick?.();
					},
					MouseButton1Down: () => {
						setPressed(true);
					},
					MouseButton1Up: () => {
						setPressed(false);
					},
					MouseEnter: () => {
						playSoundEffect("hover");
						setHovered(true);
						setPressed(false);
					},
					MouseLeave: () => {
						setHovered(false);
						setPressed(false);
					},
				}}
				Position={UDim2.fromScale(0.5, 0.5)}
				Selectable={false}
				// Size={buttonOffset.map(value => new UDim2(1, value, 1, value))}
				Size={buttonSize}
				Text=""
				TextTransparency={buttonTransparency}
				{...Native}
			>
				<uistroke
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
					Color={defaultTheme.colors.primary}
					Thickness={strokeSize}
					Transparency={strokeTransparency}
				/>

				<uigradient
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, new Color3(1, 1, 1)),
							new ColorSequenceKeypoint(1, Color3.fromRGB(229, 198, 112)),
						])
					}
					Rotation={45}
					Transparency={buttonTransparency.map(value => {
						return new NumberSequence([
							new NumberSequenceKeypoint(0, value),
							new NumberSequenceKeypoint(1, value),
						]);
					})}
				/>

				<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, -5)}>
					<uilistlayout
						Padding={new UDim(0, 5)}
						VerticalAlignment={Enum.VerticalAlignment.Bottom}
					/>
					<textlabel
						AnchorPoint={new Vector2(0, 1)}
						BackgroundTransparency={1}
						FontFace={fonts.primaryConstructed.bold}
						Position={new UDim2(0, 0, 1, -25)}
						Size={new UDim2(1, 0, 0, 25)}
						Text={Title ?? "NO TITLE PROVIDED"}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
						TextSize={25}
						TextTransparency={buttonTransparency}
						TextWrapped={true}
						TextXAlignment={Enum.TextXAlignment.Left}
						TextYAlignment={viewportSize.map(value => {
							return value.Y < 500
								? Enum.TextYAlignment.Center
								: Enum.TextYAlignment.Bottom;
						})}
					>
						<DefaultTextPadding />
					</textlabel>

					<textlabel
						BackgroundTransparency={1}
						FontFace={fonts.primaryConstructed.regular}
						Position={new UDim2(0, 0, 1, -25)}
						Size={new UDim2(1, 0, 0, 25)}
						Text={Description ?? "NO DESCRIPTION PROVIDED"}
						TextColor3={new Color3(1, 1, 1)}
						TextSize={16}
						TextTransparency={buttonTransparency}
						TextXAlignment={Enum.TextXAlignment.Left}
						TextYAlignment={Enum.TextYAlignment.Top}
						Visible={viewportSize.map(value => value.Y > 500)}
					>
						<DefaultTextPadding />
					</textlabel>
				</frame>

				{Thumbnail !== undefined ? (
					<imagelabel
						BackgroundTransparency={1}
						Image={Thumbnail}
						// ImageTransparency={0.1}
						ImageTransparency={buttonTransparency.map(value => 0.1 + value * 0.9)}
						ScaleType={Enum.ScaleType.Crop}
						Size={UDim2.fromScale(1, 1)}
						ZIndex={-2}
					>
						<uigradient
							Color={
								new ColorSequence([
									new ColorSequenceKeypoint(0, new Color3(1, 1, 1)),
									new ColorSequenceKeypoint(0.5, new Color3(1, 1, 1)),
									new ColorSequenceKeypoint(1, Color3.fromRGB(86, 86, 86)),
								])
							}
							Rotation={90}
						/>
					</imagelabel>
				) : (
					<textlabel
						BackgroundTransparency={1}
						FontFace={fonts.primaryConstructed.medium}
						Size={UDim2.fromScale(1, 1)}
						Text="NO MEDIA PROVIDED"
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
						TextSize={20}
						// TextTransparency={0.8}
						TextTransparency={buttonTransparency.map(value => 0.8 + value * 0.2)}
						TextWrapped={true}
					>
						<DefaultTextPadding />

						<uitextsizeconstraint MaxTextSize={20} />
					</textlabel>
				)}
			</textbutton>
		</frame>
	);
}

export default Card;
