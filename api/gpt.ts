import { Message } from "@/types";

export const callGPTAPI = async (messages: Message[]) => {
  try {
    console.log("rolePlaying");

    const response = await fetch("/api/gpt", {
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

export const googleTTS = async (text: string) => {
  try {
    const response = await fetch("/api/google/synthesize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }).then((res) => res.json());
    return response;
  } catch (error) {
    console.error(error);
  }
};
