import type { Theme } from "./theme";
import { fonts } from "./fonts";
import { images } from "./images";

export const defaultTheme: Theme = {
	colors: {
		background: new Color3(0, 0, 0),
		border: new Color3(0, 0, 0),
		card: new Color3(0, 0, 0),
		primary: Color3.fromRGB(248, 214, 121),
		secondary: new Color3(0, 0, 0),
		text: {
			link: new Color3(0, 0, 0),
			primary: Color3.fromRGB(234, 234, 234),
			secondary: new Color3(0, 0, 0),
		},
	},
	fonts,
	images,
};
