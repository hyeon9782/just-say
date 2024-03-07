import KakaoButton from "@/components/auth/KakaoButton";
import { supabase } from "@/libs/supabase";

const SignIn = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div className="h-full flex justify-center items-center">
      {user ? <button onClick={signOut}>로그아웃</button> : <KakaoButton />}
    </div>
  );
};

export default SignIn;
