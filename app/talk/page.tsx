"use client";

import TalkButton from "@/components/talk/TalkButton";
import Container from "@/composables/Container";
import Modal from "@/composables/Modal";
import { SELECT_DATA } from "@/constants/select-data";
import { textToSpeech } from "@/services/talk";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const TalkPage = () => {
  const params = useSearchParams();
  const situationParam = params.get("situation");
  const situation = SELECT_DATA.SITUATIONS.find(
    (situation) => situation.en === situationParam
  );

  return (
    <>
      <Container>
        <div className="h-full">
          <div
            className="h-[70%] flex items-end"
            style={{
              backgroundImage: `url('${situation?.img}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex w-full justify-around">
              <h1 className="text-4xl font-bold mb-[30px]">
                메뉴를 보고, 카페에서 내가 먹고 싶은 것을 주문해 보세요.
              </h1>
              <div className="flex flex-col items-center">
                <Image
                  src={"/images/document 1.png"}
                  alt="메뉴"
                  width={40}
                  height={40}
                />
                <span className="text-s">메뉴판</span>
              </div>
            </div>
          </div>
          <div className="h-[30%] box-border flex flex-col justify-center items-center bg-gray-100">
            <TalkButton />
          </div>
        </div>
      </Container>
      {/* <Modal /> */}
    </>
  );
};

export default TalkPage;
