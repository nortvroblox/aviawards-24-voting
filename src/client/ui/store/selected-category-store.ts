import Object from "@rbxts/object-utils";
import categories from "shared/categories";
import { create } from "../../../shared/modules/zustand";

type SelectedCategoryStore = {
	selectedCategory: keyof typeof categories;
	setSelectedCategory: (category: keyof typeof categories) => void;
};

export const useSelectedCategoryStore = create<SelectedCategoryStore>(
	(set) => ({
		selectedCategory: Object.keys(categories)[0] as keyof typeof categories,
		setSelectedCategory: (category) => set({ selectedCategory: category }),
	})
);
