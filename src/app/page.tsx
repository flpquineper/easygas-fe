import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>Peça seu gás agora!</p>

        <button>
          Login
        </button>

        <Link href="/cadastro">
          Fazer Cadastro
        </Link>

        <button>
          Pedir Sem Cadastro
        </button>

    </main>
    </div>
  );
}
