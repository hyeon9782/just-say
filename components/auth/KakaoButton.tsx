"use client";

import { supabase } from "@/libs/supabase";
import React, { useEffect, useState } from "react";

const KakaoButton = () => {
  const [isLogin, setIsLogin] = useState(false);
  const check = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    setIsLogin(user ? true : false);
  };

  useEffect(() => {
    check();
  }, []);

  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    console.log(data);
    console.log(error);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  return (
    <>
      <button
        onClick={signInWithKakao}
        className="rounded-xl bg-slate-100 px-4 py-2"
      >
        카카오 로그인
      </button>
      {isLogin ? "로그인 중" : "로그아웃 됨"}
      <button onClick={signOut} className="rounded-xl bg-slate-100 px-4 py-2">
        로그아웃
      </button>
    </>
  );
};

export default KakaoButton;
