import Button from "@/composables/Button";
import Modal from "@/composables/Modal";
import React from "react";
type Props = {
  onSubmit?: (value: any) => void;
  onRedirect?: () => void;
  onClose: () => void;
  content: string;
  title: string;
};
const ConfirmModal = ({
  onSubmit,
  onClose,
  onRedirect,
  content,
  title,
}: Props) => {
  const handleClickSubmit = async () => {
    onSubmit && onSubmit("my-value");
    onClose();
  };

  const handleClickCancel = () => {
    onRedirect && onRedirect();
    onClose();
  };
  return (
    <Modal>
      <div className="bg-white rounded-xl p-[20px]">
        <div className="text-3xl">{title}</div>
        <div className="text-xl py-[20px]">{content}</div>
        <div className="flex gap-[20px]">
          <Button onClick={handleClickCancel}>닫기</Button>
          <Button onClick={handleClickSubmit}>확인</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
