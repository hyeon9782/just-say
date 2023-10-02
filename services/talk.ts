import { DEFAULT, TALK_END } from "@/constants/prompt";
import { CAFE_STAFF, TAXI_DRIVER } from "@/constants/prompt";
import { InitGPT, TextToSpeech } from "@/types";

const textToSpeech = ({
  rate = 3,
  pitch = 2,
  lang = "ko-KR",
  volume = 0.5,
  text = "음성이 없습니다.",
}: TextToSpeech) => {
  speechSynthesis.cancel(); // 현재 읽고 있다면 초기화

  const utterance = new SpeechSynthesisUtterance();
  utterance.rate = rate; // 속도 (0.1 ~ 10)
  utterance.pitch = pitch; // 음 높이 (0 ~ 2)
  utterance.lang = lang; // 언어
  utterance.text = text; // 내용
  utterance.volume = volume; // 음성의 크기 0.0 ~ 1.0

  speechSynthesis.speak(utterance);
};

const initGPT = ({ type, lang }: InitGPT) => {
  let content = DEFAULT;

  // 기본 역할을 지정해줍니다.
  switch (type) {
    case "cafe":
      content += CAFE_STAFF;
      break;
    case "taxi":
      content += TAXI_DRIVER;
      break;
  }

  // 반드시 지정된 언어로만 답변합니다.
  content += `always say in ${lang}`;

  // 사용자가 지정된 언어가 아닌 말로 답변하는 경우 모르겠다고 답변합니다.
  content += `you do not understand if the customer does not speak in ${lang}`;

  // 대화가 끝났다고 판단하면 @@를 보냅니다.
  content += TALK_END;

  console.log(content);

  return content;
};

export { textToSpeech, initGPT };
