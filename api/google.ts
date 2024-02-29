type Payload = {
  // type 수정하기
  text: string;
  languageCode: string;
  name: string;
};

export const googleTTS = async ({
  text = "음성이 없습니다.",
  languageCode = "en-US",
  name = "en-US-Casual-K",
}: Payload) => {
  try {
    const response = await fetch("/api/google/synthesize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, languageCode, name }),
    }).then((res) => res.json());
    return response;
  } catch (error) {
    console.error(error);
  }
};
