import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import CurrentCategoryHero from "./current-category-hero";

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<folder>
				<CurrentCategoryHero />
			</folder>
		);
	},
};

export = story;
