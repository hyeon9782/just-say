import { CAFE } from "@/constants/cafe";
import { VOICE_NAME } from "@/constants/google";
import { InitGPT, Message } from "@/types";

const initGPT = ({ type, lang, suggested }: InitGPT): string => {
  let menu_num = CAFE.menu_list.length;
  const menus = CAFE.menu_list.map((item) => item.menu);
  const prices = CAFE.menu_list.map((item) => item.price);

  //  기본 역할 정의
  let define_bot_role = CAFE.prompts.system.join(" ");

  //  이건 별도로 넣을 수 밖에 없는건가? 아니면 전부 그냥 텍스트로 미리 넣어두는거?
  //  카페 메뉴 설정. 이미지에 있는 메뉴 모두 추가
  define_bot_role += `you have ${menu_num} menus. The menus and price are `;
  for (let idx = 0; idx < menu_num; idx++) {
    define_bot_role += `${menus[idx]} and price is ${prices[idx]}`;
    if (idx === menu_num - 1) {
      define_bot_role += ".";
    } else {
      define_bot_role += ",";
    }
  }

  //  그 외 기본 세팅
  define_bot_role += "always say in " + lang + ".";
  // 시작할 때 유저가 먼저 말하는게 아니고 chatGPT가 먼저 인사하게 만듭니다.
  define_bot_role +=
    "Let's start now. You say 'Can I take your order?' in " + lang + " first.";
  // 고객이 이미 카페 안에 있다고 가정합니다 (방문해서 알아보세요라는 대답 방지 )
  //define_bot_role += "The customer is currently in the cafe."
  // 외국어로 말하면 잘 모르겠다고(이해를 못하겠다고) 답변
  define_bot_role +=
    "you do not understand if the customer does not speak in " + lang + ".";
  // 포장 여부 혹은 결제 방법 꼭 물어보기
  // define_bot_role += "during the conversation, payment method and for here or to go is important."
  // define_bot_role += "Ask one question at a time. "
  // define_bot_role += "do not include 'swipe machine provided' in the conversation."

  // 항상 상기시켜야 하는 내용들?
  // 이후 4096을 넘어갔을 때 다시 한번 상기시켜야 함.
  let notice_msg =
    "you never say you are a bot but pretend you are a cafe manager.";

  notice_msg += "Use " + lang + " only.";
  notice_msg +=
    "add @ at the end of conversation if the order and payment made by user was successful.";
  notice_msg +=
    "The following is the start of conversation with customer and start talking 'Welcome!' include another one sentence.";

  if (suggested) {
    notice_msg +=
      "Based on the conversation between the user and GPT, the user will receive 4 recommended answers to answer GPT's questions.";
  }
  define_bot_role += notice_msg;

  // const system = { role: "system", content: define_bot_role };

  return define_bot_role;
};

const arrayToString = (messages: Message[]) => {
  const messagesStr = messages
    .map((message) => {
      if (message.role === "user") {
        return "User: " + message.content + ". ";
      } else if (message.role === "assistant") {
        return "GPT: " + message.content + ". ";
      }
    })
    .join(" ");

  console.log(messagesStr);

  return messagesStr;
};

function getVoiceNames(languageCode: string) {
  const voiceData = VOICE_NAME[languageCode];
  if (!voiceData) {
    return "해당 언어 코드에 대한 데이터가 없습니다.";
  }

  const voiceNames = [];
  for (const voice in voiceData) {
    voiceNames.push(voiceData[voice].voice_name);
  }

  const randomIndex = Math.floor(Math.random() * voiceNames.length);
  return voiceNames[randomIndex];
}

export { initGPT, arrayToString, getVoiceNames };
