import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import PhysicalLoadingUI from "./physical-loading-ui";

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<folder>
				<PhysicalLoadingUI />
			</folder>
		);
	},
};

export = story;
