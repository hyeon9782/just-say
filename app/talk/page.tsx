"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import MenuModal from "@/components/modals/MenuModal";
import TalkButton from "@/components/talk/TalkButton";
import Container from "@/composables/Container";
import { CloseIcon } from "@/composables/icons";
import { SELECT_DATA } from "@/constants/select-data";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const TalkPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const situationParam = params.get("situation");
  const [menuModal, setMenuModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const situation = SELECT_DATA.SITUATIONS.find(
    (situation) => situation.en === situationParam
  );

  return (
    <>
      <Container>
        <div className="h-full">
          <div
            className="h-[70%] flex flex-col"
            style={{
              backgroundImage: `url('${situation?.img}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex justify-end h-[10%]">
              <CloseIcon
                className="p-[10px] text-black text-6xl"
                onClick={() => setConfirmModal(true)}
              />
            </div>
            <div className="h-[70%]">추천 답변 공간</div>
            <div className="flex w-full justify-around h-[20%]">
              <h1 className="text-4xl font-bold mb-[30px]">
                메뉴를 보고, 카페에서 내가 먹고 싶은 것을 주문해 보세요.
              </h1>
              <div
                className="flex flex-col items-center"
                onClick={() => setMenuModal(true)}
              >
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
      {menuModal && <MenuModal onClose={() => setMenuModal(false)} />}
      {confirmModal && (
        <ConfirmModal
          onSubmit={() => router.push("/result")}
          onClose={() => setConfirmModal(false)}
          content="대화는 실패로 처리됩니다."
          title="대화를 정말 끝내시겠어요?"
        />
      )}
    </>
  );
};

export default TalkPage;
