import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 w-full max-w-xs">
        <h2 className="text-3xl font-semibold text-center">
          Peça seu gás agora!
        </h2>

        <Link
          href="/loginUser"
          className="w-full py-3 bg-[#5F54FF] text-white rounded text-center text-base"
        >
          Login
        </Link>

        <Link
          href="/cadastroUser"
          className="w-full py-3 bg-blue-600 text-white rounded text-center text-base"
        >
          Fazer Cadastro
        </Link>

        <Link
          href="/catalogo"
          className="w-full py-3 bg-[#6C87F4] text-white rounded text-center text-base"
        >
          Pedir Sem Cadastro
        </Link>
      </main>
    </div>
  );
}
