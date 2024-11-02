import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import Card from "./card";

interface Controls {
	Selected: boolean;
}

const controls: Controls = {
	Selected: false,
};

const story = {
	controls,
	react: React,
	reactRoblox: ReactRoblox,
	story: (props: { controls: Controls }) => {
		return (
			<folder>
				<Card Selected={props.controls.Selected} />
			</folder>
		);
	},
};

export = story;
