import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import AviawardsLogo from "./avi-logo";

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<folder>
				<AviawardsLogo />
			</folder>
		);
	},
};

export = story;
