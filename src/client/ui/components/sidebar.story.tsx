import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import Sidebar from "./sidebar";

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<folder>
				<Sidebar />
			</folder>
		);
	},
};

export = story;
