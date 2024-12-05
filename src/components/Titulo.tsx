'use client'
import Cookies from "js-cookie"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi"

export function Titulo() {
  const [adminNome, setAdminNome] = useState<string>("")

  useEffect(() => {
    if (Cookies.get("admin_logado_nome")) {
      setAdminNome(Cookies.get("admin_logado_nome") as string)
    }
  }, [])

  return (
    <nav className="bg-gray-900 flex flex-wrap justify-between fixed top-0 left-0 w-full z-50 border-b-2 border-grey-800">
      <div className="text-white flex flex-wrap justify-between max-w-screen-xl p-4">
        <Link href="/principal" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.webp" className="h-16" alt="Fusca" />
          <span className="text-white self-center text-3xl font-semibold whitespace-nowrap">
            Legends: Administração
          </span>
        </Link>
      </div>
      <div className="flex me-4 items-center font-bold text-white">
        <FiUsers className="mr-2" />
        {adminNome}
      </div>
    </nav>
  )
}