import React from "@rbxts/react";

import assets from "shared/assets";

import { fonts } from "../themes";

export default function PhysicalLoadingUI(): React.ReactNode {
	return (
		<folder>
			<uilistlayout
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<textlabel
				BackgroundTransparency={1}
				FontFace={fonts.primaryConstructed.bold}
				LayoutOrder={2}
				Size={UDim2.fromScale(0.4, 0.08)}
				Text="Voting"
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				TextStrokeTransparency={0.93}
			/>

			<imagelabel
				BackgroundTransparency={1}
				Image={assets["avi-wordmark-golden"]}
				LayoutOrder={1}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(0.4, 0.08)}
			/>

			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.BuilderSansBold}
				LayoutOrder={2}
				Size={UDim2.fromScale(0.4, 0.015)}
				Text="(Loading)"
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				TextStrokeTransparency={0.93}
			/>
		</folder>
	);
}
