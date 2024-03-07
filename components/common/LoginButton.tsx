"use client";

import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  return <button onClick={() => router.push("/login")}>로그인</button>;
};

export default LoginButton;
