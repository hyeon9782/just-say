import { create } from "zustand";

const useSuggestionStore = create((set) => ({
  suggestions: [],
  addSuggestion: (newSugesstions: string[]) => {
    console.log(newSugesstions);
    set(() => ({
      suggestions: [...newSugesstions],
    }));
  },
}));

export default useSuggestionStore;
