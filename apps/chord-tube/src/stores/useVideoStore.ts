import { create } from "zustand";

type CategoryIdStore = {
  categoryId: number | string;
  setCategoryId: (id: number | string) => void;
};

export const useCategoryIdStore = create<CategoryIdStore>((set) => ({
  categoryId: 0,
  setCategoryId: (id) => set({ categoryId: id }),
}));
