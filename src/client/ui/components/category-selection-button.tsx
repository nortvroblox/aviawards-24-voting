import React from "@rbxts/react";

import { springs } from "../constants/springs";
import { useMotion } from "../hooks/use-motion";
import { usePlayerDataStore } from "../store/player-data-store";
import { defaultTheme, fonts } from "../themes";

export interface Props<T extends Instance = Frame> {
	EnterTweenDelay?: number;

	/** Category Name. */
	Name: string;

	/** The default properties of the component. */
	Native?: Partial<React.InstanceProps<T>>;

	/** On Click. */
	OnClick?: () => void;

	/** Is Selected. */
	Selected: boolean;
}

interface CategoryButtonSelectedBackdropProps {
	Visible?: boolean;
}

const CategoryButtonSelectedBackdrop = React.memo(
	(props: Readonly<CategoryButtonSelectedBackdropProps>) => {
		const [backdropVisibility, backdropVisibilityMotion] = useMotion(1);
		const [backdropXOffset, backdropXOffsetMotion] = useMotion(-8);

		React.useEffect(() => {
			backdropVisibilityMotion.spring((props.Visible ?? false) ? 0 : 1, springs.responsive);
			backdropXOffsetMotion.spring((props.Visible ?? false) ? -8 : -16, springs.responsive);
		}, [backdropVisibilityMotion, backdropXOffsetMotion, props.Visible]);

		return (
			<frame
				BackgroundColor3={defaultTheme.colors.primary}
				BorderColor3={new Color3(0, 0, 0)}
				BorderSizePixel={0}
				Position={backdropXOffset.map(x => new UDim2(0, x, 0, 0))}
				Size={new UDim2(1.11, -30, 0, 25)}
				Transparency={backdropVisibility}
			>
				<uigradient
					Transparency={
						new NumberSequence([
							new NumberSequenceKeypoint(0, 0),
							new NumberSequenceKeypoint(0.01, 0),
							new NumberSequenceKeypoint(0.0101, 0.8),
							new NumberSequenceKeypoint(1, 1),
						])
					}
				/>
			</frame>
		);
	},
);

const CategorySelectionButton = React.memo((props: Readonly<Props>) => {
	const [buttonColor, buttonColorMotion] = useMotion(defaultTheme.colors.text.primary);
	const [buttonTransparency, buttonTransparencyMotion] = useMotion(1);
	const [isHovering, setIsHovering] = React.useState(false);
	const [buttonXPositionOffset, buttonXPositionOffsetMotion] = useMotion(-8);

	const [hasEntered, setHasEntered] = React.useState(false);
	const playerData = usePlayerDataStore(state => state.playerData);

	React.useEffect(() => {
		if (!hasEntered) {
			return;
		}

		const shouldHighlight =
			playerData.voted[props.Name as keyof typeof playerData.voted] !== false || isHovering;

		if (props.Selected) {
			buttonColorMotion.spring(defaultTheme.colors.primary, springs.responsive);
		} else if (shouldHighlight) {
			buttonColorMotion.spring(new Color3(1, 1, 1), springs.responsive);
		} else {
			buttonColorMotion.spring(defaultTheme.colors.text.primary, springs.responsive);
		}

		if (shouldHighlight) {
			buttonTransparencyMotion.spring(0.1, springs.responsive);
		} else {
			buttonTransparencyMotion.spring(0.4, springs.responsive);
		}
	}, [
		props.Selected,
		isHovering,
		buttonColorMotion,
		buttonTransparencyMotion,
		hasEntered,
		props.Name,
		playerData,
	]);

	React.useEffect(() => {
		task.spawn(() => {
			task.wait(props.EnterTweenDelay ?? 0);
			buttonTransparencyMotion.spring(0.1, springs.gentle);
			buttonXPositionOffsetMotion.spring(0, springs.gentle);
			setHasEntered(true);
		});
	}, [buttonTransparencyMotion, buttonXPositionOffsetMotion, props.EnterTweenDelay]);

	return (
		<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 0, 25)}>
			<textbutton
				BackgroundTransparency={1}
				Event={{
					MouseButton1Click: props.OnClick,
					MouseEnter: () => {
						setIsHovering(true);
					},
					MouseLeave: () => {
						setIsHovering(false);
					},
				}}
				FontFace={fonts.primaryConstructed.medium}
				Position={buttonXPositionOffset.map(x => new UDim2(0, x, 0, 0))}
				Selectable={false}
				TextColor3={buttonColor}
				TextSize={16}
				TextTransparency={buttonTransparency}
				TextXAlignment={Enum.TextXAlignment.Left}
				Size={new UDim2(1, 0, 0, 25)}
				// force margin, too lazy to do it properly
				Text={" " + props.Name.upper()}
			>
				<CategoryButtonSelectedBackdrop Visible={props.Selected} />
			</textbutton>
		</frame>
	);
});

export default CategorySelectionButton;
