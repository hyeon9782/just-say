"use client";

import Button from "@/composables/Button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const NextButton = ({ children }: Props) => {
  const router = useRouter();
  return (
    <Button type="next" onClick={() => router.push("/language")}>
      {children}
    </Button>
  );
};

export default NextButton;
