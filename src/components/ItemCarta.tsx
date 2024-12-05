'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { CartaI } from "@/utils/types/cartas"

interface listaCartaProps {
  carta: CartaI,
  cartas: CartaI[],
  setCartas: Dispatch<SetStateAction<CartaI[]>>
}

function ItemCarta({ carta, cartas, setCartas }: listaCartaProps) {

  async function excluirCarta() {

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cartas/${carta.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const cartas2 = cartas.filter(x => x.id != carta.id)
        setCartas(cartas2)
        alert("Carta excluído com sucesso")
      } else {
        alert("Erro... Carta não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cartas/destacar/${carta.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const cartas2 = cartas.map(x => {
        if (x.id == carta.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setCartas(cartas2)
    }
  }

  return (
    <tr key={carta.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={carta.foto} alt="Capa do Carta"
          style={{width: 170}} />
      </th>
      <td className={`px-6 py-4 ${carta.destaque ? "font-extrabold" : ""}`}>
        {carta.nome}
      </td>
      <td className={`px-6 py-4 ${carta.destaque ? "font-extrabold" : ""}`}>
        {carta.nacionalidade.nome}
      </td>
      <td className={`px-6 py-4 ${carta.destaque ? "font-extrabold" : ""}`}>
        {carta.anoNascimento == 1 ? "Indefinido" : carta.anoNascimento}
      </td>
      <td className={`px-6 py-4 ${carta.destaque ? "font-extrabold" : ""}`}>
        {Number(carta.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirCarta} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemCarta