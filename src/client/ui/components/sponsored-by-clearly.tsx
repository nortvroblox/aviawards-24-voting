import React from "@rbxts/react";

import assets from "shared/assets";

import { defaultTheme, fonts } from "../themes";

const SponsoredByClearly = React.memo(() => {
	return (
		<frame BackgroundTransparency={1} Size={UDim2.fromOffset(250, 20)}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Right}
			/>
			<imagelabel
				BackgroundTransparency={1}
				Image={assets["clearlydev-logo-dark"]}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromOffset(117, 20)}
			>
				<textlabel
					AnchorPoint={new Vector2(0, 1)}
					BackgroundTransparency={1}
					FontFace={fonts.primaryConstructed.bold}
					Size={new UDim2(1, 0, 0, 10)}
					Text="SPONSORED BY"
					TextColor3={defaultTheme.colors.text.primary}
					TextSize={10}
					TextTransparency={0.3}
					TextXAlignment={Enum.TextXAlignment.Right}
				/>
			</imagelabel>
		</frame>
	);
});

export default SponsoredByClearly;
