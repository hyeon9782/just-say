import { Message } from "@/stores/useMessageStore";

export const gptAPI = async (messages: Message[]) => {
  return fetch("/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });
};
