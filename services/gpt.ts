import { Message } from "@/types";
import { SUGGESTION } from "@/constants/suggestion";
import { SUMMARIZE } from "@/constants/summarize";

const rolePlaying = async (messages: Message[]) => {
  try {
    console.log("rolePlaying");

    const response = await fetch("/api/openai", {
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

const suggestion = async (messagesStr: string) => {
  const res = await fetch("/api/suggestion", {
    method: "POST",
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: SUGGESTION,
        },
        {
          role: "user",
          content: messagesStr,
        },
      ],
    }),
  }).then((res) => res.json());

  return res.result.split("/");
};

const summarize = async (messagesStr: string) => {
  const res = await fetch("/api/summarize", {
    method: "POST",
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: SUMMARIZE,
        },
        {
          role: "user",
          content: messagesStr,
        },
      ],
    }),
  }).then((res) => res.json());

  return res.result;
};

export { rolePlaying, suggestion, summarize };
