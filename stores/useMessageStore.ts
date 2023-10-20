import { Message, Messages, MessagesAction } from "@/types";
import { create } from "zustand";

const useMessageStore = create<Messages | MessagesAction>((set) => ({
  messages: [],
  addMessage: (newMessage: Message[]) => {
    console.log(newMessage);

    set(() => ({
      messages: [...newMessage],
    }));
  },
}));

export default useMessageStore;
