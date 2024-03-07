"use client";

import { supabase } from "@/libs/supabase";
import React from "react";

const KakaoButton = () => {
  const signInWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };
  return (
    <button
      onClick={signInWithKakao}
      className="rounded-xl bg-slate-100 px-4 py-2"
    >
      카카오 로그인
    </button>
  );
};

export default KakaoButton;
