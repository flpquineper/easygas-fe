"use client";
import { Suspense } from "react";
import LoginForm from "../../components/LoginForm";

export default function LoginUser() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 font-[family-name:var(--font-geist-sans)]">
      <Suspense fallback={<a>loading</a>}>
        
        <LoginForm/>
      </Suspense>

    </div>
  );
}
