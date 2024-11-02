import React from "@rbxts/react";

import { defaultTheme, fonts } from "../themes";

export interface Props<T extends Instance = Frame> extends React.PropsWithChildren {
	/** The default properties of the component. */
	Native?: Partial<React.InstanceProps<T>>;
}

const AviawardsLogo = React.memo((props: Readonly<Props>) => {
	return (
		<frame BackgroundTransparency={1} Size={UDim2.fromOffset(240, 56)} {...props.Native}>
			<textlabel
				AnchorPoint={new Vector2(0, 1)}
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				FontFace={fonts.primaryConstructed.bold}
				Position={UDim2.fromOffset(0, 42)}
				Text="AVIAWARDS"
				TextColor3={defaultTheme.colors.primary}
				TextSize={42}
			/>

			<textlabel
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				FontFace={fonts.primaryConstructed.regular}
				Position={UDim2.fromOffset(0, 42)}
				Text="ROBLOX AVIATION AWARDS 2024"
				TextColor3={defaultTheme.colors.text.primary}
				TextSize={16}
			/>
		</frame>
	);
});

export default AviawardsLogo;
