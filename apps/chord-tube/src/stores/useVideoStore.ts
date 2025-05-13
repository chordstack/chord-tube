import { create } from "zustand";

import type {
  CategoryIdStore,
  flagPage,
  RegionCodeStore,
  SearchState,
} from "../service/type";

export const useCategoryIdStore = create<CategoryIdStore>((set) => ({
  categoryId: 0,
  setCategoryId: (id) => set({ categoryId: id }),
}));

export const useRegionCodeStore = create<RegionCodeStore>((set) => ({
  regionCode: "GB",
  setRegionCode: (code) => set({ regionCode: code }),
}));

export const useSearchStore = create<SearchState>((set, get) => ({
  input: "",
  query: "",
  setInput: (value) => set({ input: value }),
  submitQuery: () => set({ query: get().input }),
}));

export const useFlagStore = create<flagPage>((set) => ({
  flag: false,
  setFlag: (flag) => set({ flag }),
}));
