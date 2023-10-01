import { create } from "zustand";

export type Message = {
  role: string;
  content: string;
};

type MessagesAction = {
  setMessages: (newMessage: Message) => void;
};

type Messages = {
  messages: Message[];
};

const useMessageStore = create<Messages | MessagesAction>((set) => ({
  messages: [],
  setMessages: (newMessage: {}) =>
    set((prev) => ({
      messages: [...prev.messages, newMessage],
    })),
}));

export default useMessageStore;
