"use client";

import Button from "@/composables/Button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const StartButton = ({ children }: Props) => {
  const router = useRouter();
  return (
    <Button type="start" onClick={() => router.push("/select")}>
      {children}
    </Button>
  );
};

export default StartButton;