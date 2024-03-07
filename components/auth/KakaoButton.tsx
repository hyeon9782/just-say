"use client";

import { createClient } from "@/libs/supabase/client";

const KakaoButton = () => {
  const supabase = createClient();

  const signInWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <button
      onClick={signInWithKakao}
      className="rounded-full bg-yellow-300 w-16 h-16 font-bold"
    >
      Kakao
    </button>
  );
};

export default KakaoButton;
