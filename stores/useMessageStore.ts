import { Message, Messages, MessagesAction } from "@/types";
import { create } from "zustand";

const useMessageStore = create<Messages | MessagesAction>((set) => ({
  messages: [],
  setMessages: (newMessage: Message[]) =>
    set((prev) => ({
      messages: [...prev.messages, ...newMessage],
    })),
}));

export default useMessageStore;
