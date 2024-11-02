// (
//     <frame
//       BackgroundColor3={Color3.fromRGB(255, 0, 0)}
//       BackgroundTransparency={0.55}
//       BorderColor3={Color3.fromRGB(0, 0, 0)}
//       BorderSizePixel={0}
//       Key={"End"}
//       Position={UDim2.fromScale(0.354, 0.324)}
//       Size={UDim2.fromOffset(500, 500)}
//     >
//       <frame
//         BackgroundColor3={Color3.fromRGB(255, 255, 255)}
//         BorderColor3={Color3.fromRGB(0, 0, 0)}
//         BorderSizePixel={0}
//         Key={"1"}
//         Position={UDim2.fromScale(0.115, 0.587)}
//         Rotation={45}
//         Size={UDim2.fromScale(0.35, 0.12)}
//         ZIndex={2}
//       >
//         <uicorner
//           Key={"UICorner"}
//           CornerRadius={new UDim(0, 32)}
//         />
//       </frame>

//       <frame
//         BackgroundColor3={Color3.fromRGB(255, 255, 255)}
//         BorderColor3={Color3.fromRGB(0, 0, 0)}
//         BorderSizePixel={0}
//         Key={"2"}
//         Position={UDim2.fromScale(0.542, 0.117)}
//         Rotation={45}
//         Size={UDim2.fromScale(0.118, 0.766)}
//         ZIndex={2}
//       >
//         <uicorner
//           Key={"UICorner"}
//           CornerRadius={new UDim(0, 32)}
//         />
//       </frame>

//       <uiaspectratioconstraint Key={"UIAspectRatioConstraint"} />
//     </frame>
//   )

// (
//     <frame
//       BackgroundColor3={Color3.fromRGB(255, 0, 0)}
//       BackgroundTransparency={0.55}
//       BorderColor3={Color3.fromRGB(0, 0, 0)}
//       BorderSizePixel={0}
//       Key={"Start"}
//       Position={UDim2.fromScale(0.647, 0.324)}
//       Size={UDim2.fromOffset(500, 500)}
//     >
//       <frame
//         BackgroundColor3={Color3.fromRGB(255, 255, 255)}
//         BorderColor3={Color3.fromRGB(0, 0, 0)}
//         BorderSizePixel={0}
//         Key={"1"}
//         Position={UDim2.fromScale(0.166, 0.464)}
//         Rotation={45}
//         Size={UDim2.fromScale(0.000689, 0.12)}
//         ZIndex={2}
//       >
//         <uicorner
//           Key={"UICorner"}
//           CornerRadius={new UDim(0, 32)}
//         />
//       </frame>

//       <frame
//         BackgroundColor3={Color3.fromRGB(255, 255, 255)}
//         BorderColor3={Color3.fromRGB(0, 0, 0)}
//         BorderSizePixel={0}
//         Key={"2"}
//         Position={UDim2.fromScale(0.271, 0.771)}
//         Rotation={45}
//         Size={UDim2.fromScale(0.118, -0.000504)}
//         ZIndex={2}
//       >
//         <uicorner
//           Key={"UICorner"}
//           CornerRadius={new UDim(0, 32)}
//         />
//       </frame>

//       <uiaspectratioconstraint Key={"UIAspectRatioConstraint"} />
//     </frame>
//   )

import React from "@rbxts/react";

import { springs } from "../constants/springs";
import { useMotion } from "../hooks";

const TICK_ANIMATIONS = {
	End: {
		"1": {
			Position: new UDim2(0.115, 0, 0.587, 0),
			Size: new UDim2(0.35, 0, 0.12, 0),
		},
		"2": {
			Position: new UDim2(0.542, 0, 0.117, 0),
			Size: new UDim2(0.118, 0, 0.766, 0),
		},
	},
	Start: {
		"1": {
			Position: new UDim2(0.166, 0, 0.464, 0),
			Size: new UDim2(0.000689, 0, 0.12, 0),
		},
		"2": {
			Position: new UDim2(0.271, 0, 0.771, 0),
			Size: new UDim2(0.118, 0, -0.000504, 0),
		},
	},
};

const TickLine = React.memo(
	(
		props: Readonly<{
			Position: React.Binding<UDim2> | UDim2;
			Rotation: number;
			Size: React.Binding<UDim2> | UDim2;
		}>,
	) => {
		return (
			<frame
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={props.Position}
				Rotation={props.Rotation}
				Size={props.Size}
				ZIndex={2}
			>
				{/* <uicorner CornerRadius={new UDim(0, 32)} /> */}
			</frame>
		);
	},
);

const TickAnimated = React.memo(
	(props: Readonly<{ Native?: Partial<React.InstanceProps<Frame>> }>) => {
		const [tickOneSize, tickOneSizeMotion] = useMotion(TICK_ANIMATIONS.Start["1"].Size);
		const [tickTwoSize, tickTwoSizeMotion] = useMotion(TICK_ANIMATIONS.Start["2"].Size);
		const [tickOnePosition, tickOnePositionMotion] = useMotion(
			TICK_ANIMATIONS.Start["1"].Position,
		);
		const [tickTwoPosition, tickTwoPositionMotion] = useMotion(
			TICK_ANIMATIONS.Start["2"].Position,
		);

		React.useEffect(() => {
			tickOneSizeMotion.spring(TICK_ANIMATIONS.End["1"].Size, springs.responsive);
			tickOnePositionMotion.spring(TICK_ANIMATIONS.End["1"].Position, springs.responsive);
			task.spawn(() => {
				task.wait(0.15);
				tickTwoSizeMotion.spring(TICK_ANIMATIONS.End["2"].Size, springs.gentle);
				tickTwoPositionMotion.spring(TICK_ANIMATIONS.End["2"].Position, springs.gentle);
			});
		}, [tickOneSizeMotion, tickTwoSizeMotion, tickOnePositionMotion, tickTwoPositionMotion]);

		return (
			<frame BackgroundTransparency={1} Size={UDim2.fromOffset(250, 250)} {...props.Native}>
				<uiaspectratioconstraint />
				<TickLine Position={tickOnePosition} Rotation={45} Size={tickOneSize} />
				<TickLine Position={tickTwoPosition} Rotation={45} Size={tickTwoSize} />
			</frame>
		);
	},
);

export default TickAnimated;
