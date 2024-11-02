import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import Popup from "./popup";

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<folder>
				<Popup />
			</folder>
		);
	},
};

export = story;
