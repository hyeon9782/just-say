"use client";

import { useRouter } from "next/navigation";

import { useUser } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AuthContent = () => {
  const supabase = createClientComponentClient(); //로그아웃 메서드를 받아오기 위해서 사용
  const router = useRouter();
  const user = useUser(); //useUser훅을 통해 유저데이터를 받아옴

  const handleAuth = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut(); //로그아웃
      if (error) {
        console.error(error);
      }
    }
    if (!user) {
      router.push("/auth");
    }
  };
  return (
    <div className="font-semibold h-full flex flex-col items-center justify-center">
      {user && <div>안녕하세요 {user?.user_metadata.full_name}님</div>}
      <div>
        <button
          className="border border-neutral-400 rounded-lg px-4 py-1 hover:bg-neutral-100 hover:border-neutral-500 transition"
          onClick={handleAuth}
        >
          {user ? "로그아웃" : "로그인"}
        </button>
      </div>
    </div>
  );
};

export default AuthContent;
