"use client";
import {
  DislikeIcon,
  FillDislikeIcon,
  FillLikeIcon,
  LikeIcon,
} from "@/composables/icons";
import { useState } from "react";

const LikeBox = () => {
  const [like, setLike] = useState("");
  const hanldeClick = (feedback: string) => {
    if (feedback === like) {
      setLike("");
    } else {
      setLike(feedback);
    }
  };
  return (
    <div className="flex gap-[20px] justify-around my-[10px]">
      <div
        className="border rounded-full text-2xl p-[10px]"
        onClick={() => hanldeClick("like")}
      >
        {like === "like" ? <FillLikeIcon /> : <LikeIcon />}
      </div>
      <div
        className="border rounded-full text-2xl p-[10px]"
        onClick={() => hanldeClick("dislike")}
      >
        {like === "dislike" ? <FillDislikeIcon /> : <DislikeIcon />}
      </div>
    </div>
  );
};

export default LikeBox;
