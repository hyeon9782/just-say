import { Message } from "@/types";

const rolePlaying = async (messages: Message[]) => {
  try {
    console.log("rolePlaying");

    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    // 다음 로직
    return response;
  } catch (error) {
    console.error("Error in rolePlaying:", error);
    throw error;
  }
};

const evaluateConversation = async (messages: Message[]) => {
  return await fetch("/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });
};

const summarizePrompt = async (messagesStr: string) => {
  return await fetch("/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messagesStr }),
  });
};

export { rolePlaying, evaluateConversation, summarizePrompt };
