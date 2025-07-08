import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 w-full max-w-xs bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-16 text-gray-800">
          Peça seu gás agora!
        </h2>

        <div className="w-full flex flex-col gap-4">
          <Link
            href="/catalogo"
            className="botao-sem-cadastro w-full py-3 text-white rounded text-center text-base"
          >
            Ver produtos
          </Link>
          <Link
            href="/login/user"
            className="botao-login w-full py-3 text-white rounded text-center text-base"
          >
            Login
          </Link>

          <Link
            href="/cadastro/user"
            className="botao-cadastro w-full py-3 text-white rounded text-center text-base"
          >
            Fazer Cadastro
          </Link>
        </div>
      </main>
    </div>
  );
}