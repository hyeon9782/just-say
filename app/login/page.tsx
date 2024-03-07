import KakaoButton from "@/components/auth/KakaoButton";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <form className="flex flex-col w-[500px]">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border rounded-sm"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border rounded-sm"
        />
        <div>
          <button formAction={login}>Log in</button>
          <button formAction={signup}>Sign up</button>
        </div>
      </form>
      <KakaoButton />
    </div>
  );
}
