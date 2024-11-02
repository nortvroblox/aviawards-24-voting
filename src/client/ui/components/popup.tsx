import { map } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";

import assets from "shared/assets";

import { springs } from "../constants/springs";
import { useMotion } from "../hooks/use-motion";
import { usePopupStore } from "../store/popup-store";

export interface Props<T extends Instance = ImageButton> {
	EnterTweenDelay?: number;

	/** The default properties of the component. */
	Native?: Partial<React.InstanceProps<T>>;
}

export default function Popup({ Native }: Readonly<Props>): React.ReactNode {
	const popupMessage = usePopupStore(state => state.popupMessage);
	const popupStartTime = usePopupStore(state => state.popupStartTime);
	const dismissPopup = usePopupStore(state => state.dismissPopup);

	const [popupTextTransparency, popupTransparencyMotion] = useMotion(1);
	const [isHovered, setIsHovered] = React.useState(false);

	React.useEffect(() => {
		const isVisible = popupMessage !== "";

		if (isVisible) {
			if (isHovered) {
				popupTransparencyMotion.spring(0, springs.molasses);
			} else {
				popupTransparencyMotion.spring(0.2, springs.molasses);
			}
		} else {
			popupTransparencyMotion.spring(1, springs.responsive);
		}
	}, [popupTransparencyMotion, popupMessage, popupStartTime, isHovered]);

	return (
		<imagebutton
			AutoButtonColor={false}
			BackgroundColor3={new Color3(0, 0, 0)}
			BackgroundTransparency={popupTextTransparency.map(x => map(x, 0, 1, 0.6, 1))}
			Event={{
				MouseButton1Click: () => {
					if (os.clock() - popupStartTime < 2 || popupStartTime === 0) {
						return;
					}

					dismissPopup();
				},
			}}
			Size={UDim2.fromScale(1, 1)}
			Visible={popupTextTransparency.map(x => x < 1 - 1 / 100)}
			{...Native}
		>
			<imagelabel
				BackgroundTransparency={1}
				Image={assets.glow}
				ImageColor3={Color3.fromRGB(135, 105, 18)}
				ImageTransparency={popupTextTransparency.map(x => map(x, 0, 1, 0.5, 1))}
				Position={UDim2.fromScale(0, 0.5)}
				Size={UDim2.fromScale(1, 1)}
			>
				<imagebutton
					BackgroundTransparency={1}
					Event={{
						MouseButton1Click: () => {
							if (os.clock() - popupStartTime < 1) {
								return;
							}

							dismissPopup();
						},
						MouseEnter: () => {
							setIsHovered(true);
						},
						MouseLeave: () => {
							setIsHovered(false);
						},
					}}
					Size={UDim2.fromScale(1, 0.5)}
				>
					<textlabel
						BackgroundTransparency={1}
						FontFace={Font.fromEnum(Enum.Font.BuilderSansBold)}
						LayoutOrder={2}
						Size={UDim2.fromScale(1, 0.015)}
						Text={popupMessage}
						TextColor3={new Color3(1, 1, 1)}
						TextSize={25}
						TextTransparency={popupTextTransparency.map(x => x)}
						TextWrapped={true}
					/>

					<textlabel
						BackgroundTransparency={1}
						FontFace={Font.fromEnum(Enum.Font.BuilderSansMedium)}
						LayoutOrder={2}
						Size={UDim2.fromScale(1, 0.015)}
						Text="Click Anywhere To Dismiss"
						TextColor3={new Color3(1, 1, 1)}
						TextSize={17}
						TextTransparency={popupTextTransparency.map(x => map(x, 0, 1, 0.5, 1))}
					/>

					<frame
						BackgroundTransparency={1}
						LayoutOrder={3}
						Size={UDim2.fromScale(0, 0.1)}
					/>

					<uilistlayout
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						Padding={new UDim(0, 16)}
						SortOrder={Enum.SortOrder.LayoutOrder}
						VerticalAlignment={Enum.VerticalAlignment.Bottom}
					/>
				</imagebutton>
			</imagelabel>
		</imagebutton>
	);
}
