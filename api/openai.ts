import { Message } from "@/types";

const openaiGPT = async (messages: Message[], type: string) => {
  try {
    console.log("openaiGPT");

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, type }),
    }).then((res) => res.json());

    return response;
  } catch (error) {
    console.error("Error in openaiGPT:", error);
    throw error;
  }
};

export { openaiGPT };
