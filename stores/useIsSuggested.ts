import { create } from "zustand";

type State = {
  isSuggested: boolean;
};

type Actions = {
  setSuggested: (value: boolean) => void;
};

const useIsSuggested = create<State & Actions>((set) => ({
  isSuggested: false,
  setSuggested: (value: boolean) =>
    set(() => ({
      isSuggested: value,
    })),
}));

export default useIsSuggested;
