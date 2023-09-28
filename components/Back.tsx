"use client";
import { LeftArrow } from "@/composables/icons";
import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <LeftArrow className="text-6xl " />
    </div>
  );
};

export default Back;
