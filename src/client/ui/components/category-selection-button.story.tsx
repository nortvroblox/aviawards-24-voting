import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import CategorySelectionButton from "./category-selection-button";

interface Controls {
	["Category Name"]: string;
	Selected: boolean;
}

const controls: Controls = {
	["Category Name"]: "Test Category",
	Selected: false,
};

const story = {
	controls,
	react: React,
	reactRoblox: ReactRoblox,
	story: (props: { controls: Controls }) => {
		return (
			<folder>
				<CategorySelectionButton
					Name={props.controls["Category Name"]}
					Selected={props.controls.Selected}
				/>
			</folder>
		);
	},
};

export = story;
