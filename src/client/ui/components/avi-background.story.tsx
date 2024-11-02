import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import AviawardsBackground from "./avi-background";

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<folder>
				<AviawardsBackground />
			</folder>
		);
	},
};

export = story;
