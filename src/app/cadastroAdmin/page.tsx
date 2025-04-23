import Image from "next/image";

export default function CatalogoAdmin() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <p>Crie sua conta</p>

        <b>Email</b>
        <b>Nome</b>
        <b>Senha</b>
        <b>Confirme sua senha</b>
    

        <button>
          Criar conta
        </button>
        
    </main>
    </div>
  );
}
