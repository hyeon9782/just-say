"use client";
import { createClient } from "@/libs/supabase/client";

const LogoutButton = () => {
  const supabase = createClient();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };
  return <button onClick={signOut}>Sign Out</button>;
};

export default LogoutButton;
