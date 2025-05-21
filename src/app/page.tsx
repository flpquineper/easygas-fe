import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 w-full max-w-xs">
        <h2 className="text-3xl font-semibold text-center mb-16 ">
          Peça seu gás agora!
        </h2>

        <div className="w-full flex flex-col gap-4">
        <Link
          href="/login/user"
          className="w-full py-3 bg-[var(--login-button)] text-white rounded text-center text-base"
        >
          Login
        </Link>

        <Link
          href="/cadastro/user"
          className="w-full py-3 bg-[var(--cadastro-button)] text-white rounded text-center text-base"
        >
          Fazer Cadastro
        </Link>

        <Link
          href="/catalogo"
          className="w-full py-3 bg-[var(--sem-cadastro-button)] text-white rounded text-center text-base"
        >
          Pedir Sem Cadastro
        </Link>
        </div>
      </main>
    </div>
  );
}
