import { Message } from "@/types";

export const callGPTAPI = async (messages: Message[]) => {
  try {
    console.log("rolePlaying");

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    return response;
  } catch (error) {
    console.error("Error in rolePlaying:", error);
    throw error;
  }
};
