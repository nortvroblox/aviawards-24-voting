export const fonts = {
	primary: {
		// regular: Enum.Font.BuilderSans,
		regular: Enum.Font.Gotham,
		bold: Enum.Font.GothamBold,
		medium: Enum.Font.GothamMedium,
	},
	primaryConstructed: {
		regular: Font.fromEnum(Enum.Font.Gotham),
		bold: Font.fromEnum(Enum.Font.GothamBold),
		medium: Font.fromEnum(Enum.Font.GothamMedium),
	},
};
