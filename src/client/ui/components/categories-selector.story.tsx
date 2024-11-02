import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import CategoriesSelector from "./categories-selector";

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<folder>
				<CategoriesSelector />
			</folder>
		);
	},
};

export = story;
