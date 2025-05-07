import Link from "next/link";

export function Header() {
  return (
    <nav className="bg-blue-500 border-gray-200">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-3">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-white self-center text-2xl font-semibold whitespace-nowrap p-3 ml-8">
            LiquiGás
          </span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
        </div>
      </div>
    </nav>
  )
}