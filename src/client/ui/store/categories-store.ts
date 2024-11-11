import { create } from "../../../shared/modules/zustand";

type Nominations = {
    [key: string]: {
        description: string;
        image: string;
    };
}

type Category = {
    options: Nominations;
    description: string;
}

type Categories = {
    [key: string]: Category;
}

type CategoriesStore = {
    categories: Categories;
    setCategoriesData: (categories: Categories) => void;
};

export const useCategoriesStore = create<CategoriesStore>(
    (set) => ({
        categories: {},
        setCategoriesData: (categories) => set({ categories }),
	})
);
