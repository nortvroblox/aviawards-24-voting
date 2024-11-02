import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import SponsoredByClearly from "./sponsored-by-clearly";

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	story: () => {
		return (
			<folder>
				<SponsoredByClearly />
			</folder>
		);
	},
};

export = story;
