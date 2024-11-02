import React from "@rbxts/react";

import assets from "shared/assets";

export interface Props<T extends Instance = ImageLabel> {
	/** The default properties of the component. */
	Native?: Partial<React.InstanceProps<T>>;
}

const AviawardsBackground = React.memo((props: Readonly<Props>) => {
	return (
		<imagelabel
			BackgroundColor3={Color3.fromRGB(14, 20, 30)}
			BorderColor3={new Color3(0, 0, 0)}
			BorderSizePixel={0}
			Image={assets.background}
			Position={UDim2.fromScale(-0.15, 0)}
			ScaleType={Enum.ScaleType.Slice}
			Size={UDim2.fromScale(1.3, 1)}
			SliceCenter={new Rect(348, 192, 380, 236)}
			{...props.Native}
		>
			<imagelabel
				BackgroundTransparency={1}
				Image={assets["wing-side"]}
				ImageTransparency={
					props.Native?.ImageTransparency !== undefined
						? props.Native.ImageTransparency
						: 0
				}
				Position={UDim2.fromScale(-0.1, 0)}
				ScaleType={Enum.ScaleType.Crop}
				Size={UDim2.fromScale(1, 1)}
			/>
		</imagelabel>
	);
});

export default AviawardsBackground;
