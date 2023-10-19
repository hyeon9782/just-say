"use client";
import TalkButton from "../talk/TalkButton";
import MenuModal from "../modals/MenuModal";
import ConfirmModal from "../modals/ConfirmModal";
import { useState } from "react";
import { CloseIcon } from "@/composables/icons";
import Suggestion from "../talk/Suggestion";
import Image from "next/image";
import { SelectedData } from "@/types";

type Props = {
  selectedData: SelectedData;
  result: (result: boolean) => void;
};

const ConversationArea = ({ selectedData, result }: Props) => {
  console.log("ConversationArea rendered");
  const [menuModal, setMenuModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  return (
    <>
      <div className="select-container">
        <div className="h-[70%] flex flex-col">
          <div className="flex justify-end h-[10%]">
            <CloseIcon
              className="p-[10px] text-black text-6xl"
              onClick={() => setConfirmModal(true)}
            />
          </div>
          <div className="h-[70%] text-center">
            <Suggestion />
          </div>
          <div className="flex w-full justify-around h-[20%] px-[10px]">
            <h1 className="text-xl sm:text-4xl font-bold mb-[30px]">
              메뉴를 보고, 카페에서 내가 먹고 싶은 것을 주문해 보세요.
            </h1>
            <div
              className="flex flex-col items-center"
              onClick={() => setMenuModal(true)}
            >
              <Image
                src={"/images/document 1.png"}
                alt="메뉴"
                width={50}
                height={40}
              />
              <span className="text-sm">메뉴판</span>
            </div>
          </div>
        </div>
        <div className="h-[30%] box-border flex flex-col justify-center items-center bg-gray-100">
          <TalkButton success={() => result(true)} />
        </div>
      </div>
      {menuModal && <MenuModal onClose={() => setMenuModal(false)} />}
      {confirmModal && (
        <ConfirmModal
          onSubmit={() => result(false)}
          onClose={() => setConfirmModal(false)}
          content="대화는 실패로 처리됩니다."
          title="대화를 정말 끝내시겠어요?"
        />
      )}
    </>
  );
};

export default ConversationArea;
