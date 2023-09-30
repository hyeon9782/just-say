import { CAFE_STAFF } from "@/constants/role";

// 전역 상태에서 관리하자
const generatePrompt = (sentence: string) => {
  const messages: {}[] = [
    {
      role: "system",
      content: CAFE_STAFF,
    },
  ];
  messages.push({
    role: "user",
    content: sentence,
  });
  return messages;
};

export { generatePrompt };
