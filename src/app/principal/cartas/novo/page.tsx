'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { NacionalidadeI } from "@/utils/types/nacionalidade"

type Inputs = {
  nome: string
  velocidade: number
  fisico: number
  defesa: number
  chute: number
  passe: number
  drible: number
  overall: number
  anoNascimento: number
  preco: number
  foto: string
  descricao: string
  raridade: string
  nacionalidadeId: number,
  comercio: boolean
}

function NovoCarta() {
  const [nacionalidades, setNacionalidades] = useState<NacionalidadeI[]>([])
  const [selectedFoto, setSelectedFoto] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getNacionalidades() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/nacionalidades`)
      const dados = await response.json()
      setNacionalidades(dados)
    }
    getNacionalidades()
    setFocus("nome")
  }, [])

  const optionsNacionalidade = nacionalidades.map(nacionalidade => (
    <option key={nacionalidade.id} value={nacionalidade.id}>{nacionalidade.nome}</option>
  ))

  async function incluirCarta(data: Inputs) {

    const novaCarta: Inputs = {
      overall: Number(data.overall),
      nome: data.nome,
      velocidade: Number(data.velocidade),
      chute: Number(data.chute),
      passe: Number(data.passe),
      drible: Number(data.drible),
      defesa: Number(data.defesa),
      fisico: Number(data.fisico),
      anoNascimento: Number(data.anoNascimento),
      preco: Number(data.preco),
      comercio: true,
      foto: data.foto,
      descricao: data.descricao,
      raridade: data.raridade,
      nacionalidadeId: Number(data.nacionalidadeId),
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cartas`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novaCarta)
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Carta cadastrada com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro da Carta...")
    }
  }

/* eslint-disable @typescript-eslint/no-empty-interface */
interface FotoChangeEvent extends React.ChangeEvent<HTMLSelectElement> { }
/* eslint-enable @typescript-eslint/no-empty-interface */

  const handleFotoChange = (event: FotoChangeEvent) => {
    setSelectedFoto(event.target.value);
  };



  return (

    <div className="bg-gray-900">
      <h1 className="pb-10 pt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Cartas
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirCarta)}>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div>
            <div className="mb-3">
              <label
                htmlFor="foto"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                URL da Foto
              </label>
              <select
                id="foto"
                className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("foto")}
                onChange={handleFotoChange}
              >
                <option value="">Selecione uma opção</option>
                <option value="/cruyff.png">Cruyff</option>
                <option value="/edecio.png">Edecio</option>
                <option value="/garrincha.png">Garrincha</option>
                <option value="/jairzinho.png">Jairzinho</option>
                <option value="/kaka.png">Kaka</option>
                <option value="/pele.png">Pele</option>
                <option value="/ronaldinho.png">Ronaldinho</option>
                <option value="/ronaldo.png">Ronaldo</option>
                <option value="/rivaldo.png">Rivaldo</option>
                <option value="/socrates.png">Socrates</option>
              </select>
              <div className="mb-3">
                <label htmlFor="anoNascimento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nascimento(Ano)</label>
                <input type="number" id="anoNascimento"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  {...register("anoNascimento")}
                />
              </div>
            </div>
            <div className="pb-3">
              <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nome do Jogador</label>
              <input type="text" id="nome"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                {...register("nome")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nacionalidadeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nacionalidade</label>
              <select id="nacionalidadeId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                {...register("nacionalidadeId")}
              >
                {optionsNacionalidade}
              </select>
            </div>
          </div>
          <div className="mt-4">
            {selectedFoto && (
              <img
                src={selectedFoto}
                alt="Capa do Carta"
                style={{ width: 230 }}
              />
            )}
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Preço R$
            </label>
            <input
              type="number"
              id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              step="0.01"
              {...register("preco")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="raridade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Raridade</label>
            <select id="raridade"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("raridade")}
            >
              <option>LENDA</option>
              <option>OURO</option>
              <option>PRATA</option>
              <option>BRONZE</option>
            </select>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="velocidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Velocidade</label>
            <input type="number" id="velocidade"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("velocidade")}
            />
          </div> */}
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-7">
          <div className="mb-3">
            <label htmlFor="velocidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Velocidade</label>
            <input type="number" id="velocidade"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("velocidade")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="chute" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Chute</label>
            <input type="number" id="chute"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("chute")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Passe</label>
            <input type="number" id="passe"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("passe")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="drible" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Drible</label>
            <input type="number" id="drible"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("drible")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fisico" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Físico</label>
            <input type="number" id="fisico"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("fisico")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="defesa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Defesa</label>
            <input type="number" id="defesa"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("defesa")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="overall" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Overall</label>
            <input type="number" id="overall"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("overall")}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="sinopse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Descrição</label>
          <textarea id="descricao" rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("descricao")}></textarea>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </div>
  )
}

export default NovoCarta