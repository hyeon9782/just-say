import { Message } from "@/types";
import { create } from "zustand";

type State = {
  messages: Message[];
};

type Actions = {
  addMessage: (newMessage: Message[]) => void;
};

const useMessageStore = create<State & Actions>((set) => ({
  messages: [],
  addMessage: (newMessage: Message[]) =>
    set(() => ({
      messages: [...newMessage],
    })),
}));

export default useMessageStore;
