import Object from "@rbxts/object-utils";
import React from "@rbxts/react";

import { springs } from "../constants/springs";
import { useMotion } from "../hooks";
import { useCategoriesStore } from "../store/categories-store";
import { useSelectedCategoryStore } from "../store/selected-category-store";
import { defaultTheme, fonts } from "../themes";

export interface Props {
	/** The default properties of the component. */
	Native?: Partial<React.InstanceProps<Frame>>;
}

const CategoryDescription = React.memo(
	({
		category,
		data,
	}: Readonly<{
		category: string;

		data: { description: string };
	}>) => {
		const currentCategory = useSelectedCategoryStore(
			(state) => state.selectedCategory
		);
		const [textTransparency, textTransparencyMotion] = useMotion(1);
		const [textXSlide, textXSlideMotion] = useMotion(0);

		React.useEffect(() => {
			textTransparencyMotion.spring(
				currentCategory === category ? 0 : 1,
				springs.responsive
			);
			textXSlideMotion.spring(
				currentCategory === category ? 0 : 20,
				springs.responsive
			);
		}, [
			currentCategory,
			category,
			textTransparencyMotion,
			textXSlideMotion,
		]);

		return (
			<folder key={category}>
				<textlabel
					AutomaticSize={Enum.AutomaticSize.Y}
					BackgroundTransparency={1}
					FontFace={fonts.primaryConstructed.regular}
					Position={textXSlide.map((value) =>
						UDim2.fromOffset(value, 35)
					)}
					RichText={true}
					Size={new UDim2(1, 0, 0, 0)}
					Text={data.description}
					TextColor3={defaultTheme.colors.text.primary}
					TextSize={18}
					TextTransparency={textTransparency.map(
						(value) => value + 0.2
					)}
					TextWrapped={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextYAlignment={Enum.TextYAlignment.Top}
				>
					<uisizeconstraint MaxSize={new Vector2(550, math.huge)} />
				</textlabel>

				<textlabel
					AnchorPoint={new Vector2(0, 1)}
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundTransparency={1}
					FontFace={fonts.primaryConstructed.bold}
					Position={textXSlide.map((value) =>
						UDim2.fromOffset(value, 35)
					)}
					Text={category}
					TextColor3={defaultTheme.colors.text.primary}
					TextSize={35}
					TextTransparency={textTransparency}
				/>
			</folder>
		);
	}
);

const CurrentCategoryHero = React.memo((props: Readonly<Props>) => {
    const categories = useCategoriesStore(state => state.categories);
	return (
		<frame
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundTransparency={1}
			{...props.Native}
		>
			{Object.entries(categories).map(([category, data]) => {
				return (
					<CategoryDescription
						key={category}
						category={category as string}
						data={data}
					/>
				);
			})}
		</frame>
	);
});

export default CurrentCategoryHero;
