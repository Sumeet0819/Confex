import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#1c1c1c]">
      <SignIn />
    </main>
  );
}
