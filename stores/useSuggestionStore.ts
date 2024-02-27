import { create } from "zustand";

type State = {
  suggestions: string[];
};

type Actions = {
  addSuggestion: (newSugesstions: string[]) => void;
};

const useSuggestionStore = create<State & Actions>((set) => ({
  suggestions: [],
  addSuggestion: (newSugesstions: string[]) =>
    set(() => ({
      suggestions: [...newSugesstions],
    })),
}));

export default useSuggestionStore;
