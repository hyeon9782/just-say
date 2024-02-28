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
