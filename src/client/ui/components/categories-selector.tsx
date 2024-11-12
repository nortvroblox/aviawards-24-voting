import Object from "@rbxts/object-utils";
import { useViewport } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";

import { useCategoriesStore } from "../store/categories-store";
import { useSelectedCategoryStore } from "../store/selected-category-store";
import { defaultTheme, fonts } from "../themes";
import CategorySelectionButton from "./category-selection-button";

export interface Props<T extends Instance = Frame> {
	/** The default properties of the component. */
	Native?: Partial<React.InstanceProps<T>>;
}

const CategoriesSelector = React.memo((props: Readonly<Props>) => {
	const selectedCategory = useSelectedCategoryStore(state => state.selectedCategory);
	const setSelectedCategory = useSelectedCategoryStore(state => state.setSelectedCategory);
	const categories = useCategoriesStore(state => state.categories);
	const viewport = useViewport();

	return (
		<frame
			BackgroundTransparency={1}
			Position={UDim2.fromOffset(0, 155)}
			SelectionGroup={true}
			Size={new UDim2(0, 300, 1, -220)}
			{...props.Native}
		>
			<textlabel
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				FontFace={fonts.primaryConstructed.bold}
				Position={UDim2.fromOffset(1, -1)}
				Text="Categories"
				TextColor3={defaultTheme.colors.primary}
				TextSize={25}
			/>

			<scrollingframe
				Active={true}
				AutomaticCanvasSize={Enum.AutomaticSize.X}
				BackgroundTransparency={1}
				BorderColor3={defaultTheme.colors.primary}
				CanvasSize={new UDim2(0, 0, 0, 25 * Object.keys(categories).size())}
				Position={UDim2.fromOffset(0, 40)}
				ScrollBarImageColor3={new Color3(1, 1, 1)}
				ScrollBarThickness={3}
				ScrollingDirection={Enum.ScrollingDirection.Y}
				Size={new UDim2(1, 0, 1, -40)}
				VerticalScrollBarInset={viewport.map(viewportSize => {
					return viewportSize.X < 800
						? Enum.ScrollBarInset.Always
						: Enum.ScrollBarInset.ScrollBar;
				})}
				VerticalScrollBarPosition={Enum.VerticalScrollBarPosition.Left}
			>
				<frame
					BackgroundTransparency={1}
					Position={UDim2.fromOffset(8, 0)}
					Size={new UDim2(1.12, -40, 1, 0)}
				>
					<uilistlayout
						HorizontalAlignment={Enum.HorizontalAlignment.Right}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>

					{Object.entries(categories).map(([category], index) => {
						return (
							<CategorySelectionButton
								key={category}
								EnterTweenDelay={0.05 * index}
								Name={category as string}
								Native={{
									LayoutOrder: index,
								}}
								OnClick={() => {
									setSelectedCategory(category as string);
								}}
								Selected={selectedCategory === category}
							/>
						);
					})}
				</frame>
			</scrollingframe>
		</frame>
	);
});

export default CategoriesSelector;
