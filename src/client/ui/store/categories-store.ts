import { Categories } from "shared/categories";
import { create } from "../../../shared/modules/zustand";

export type CategoriesStore = {
    categories: Categories;
    setCategoriesData: (categories: Categories) => void;
};

export const useCategoriesStore = create<CategoriesStore>(
    (set) => ({
        categories: {},
        setCategoriesData: (categories) => set({ categories }),
	})
);
