import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import TickAnimated from "./tick-animated";

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<folder>
				<TickAnimated />
			</folder>
		);
	},
};

export = story;
