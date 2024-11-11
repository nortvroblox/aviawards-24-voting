import { create } from "../../../shared/modules/zustand";

type SelectedCategoryStore = {
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
};

export const useSelectedCategoryStore = create<SelectedCategoryStore>(
	(set) => ({
		selectedCategory: "Best Event",
		setSelectedCategory: (category) => set({ selectedCategory: category }),
	})
);
