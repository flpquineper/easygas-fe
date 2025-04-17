import Link from "next/link";

export function Header() {
  return (
    <nav className="bg-orange-400 border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./logo.webp" className="h-16" alt="Fusca" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            LiquiGás
          </span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <span className="text-gray-500 dark:text-white hover:underline">
            (identifique-se)
          </span>
          <Link href="/login" className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </nav>
  )
}