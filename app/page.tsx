import StartButton from "@/components/StartButton";
import Container from "@/composables/Container";
import Image from "next/image";

import { getDictionary } from "@/dictionary";
import { Dict } from "@/types/dict";
import { Locale } from "@/i18n.config";

import LoginButton from "@/components/common/LoginButton";

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict: Dict = (await getDictionary(lang)) as Dict;

  return (
    <Container>
      <div className="flex items-center justify-center h-full">
        <div className="sm:w-[40%] text-center max-w-md">
          <h1 className="text-4xl sm:text-6xl font-bold mb-[50px]">
            {/* {dict.home.title} */}
            Just Say!
          </h1>
          <Image
            className="sm:hidden mb-[40px]"
            priority
            src={"/images/BG_IMG 1.png"}
            alt="BG_IMG 1"
            width={300}
            height={300}
          />
          <p className="text-xl mb-[50px]">
            {/* {dict.home.subtitle} */}
            두려움없이 외국어를 말할 수 있도록. 될 때까지 말해보세요!
          </p>
          <StartButton>
            {/* {dict.home.start_button} */}
            시작하기
          </StartButton>
          <LoginButton />
        </div>
        <div className="hidden sm:block sm:w-[40%] ">
          <Image
            priority
            src={"/images/BG_IMG 1.png"}
            alt="BG_IMG 1"
            width={500}
            height={300}
          />
        </div>
      </div>
    </Container>
  );
}
