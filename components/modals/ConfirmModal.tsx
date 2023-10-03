import Button from "@/composables/Button";
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
    <div>
      <div className="text-3xl">{title}</div>
      <div className="text-xl">{content}</div>
      <div className="flex justify-around">
        <Button onClick={handleClickCancel}>닫기</Button>
        <Button onClick={handleClickSubmit}>확인</Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
