import { NacionalidadeI } from "./nacionalidade"

export interface CartaI {
  id: number
  nome: string
  velocidade: number
  fisico: number
  defesa: number
  chute: number
  passe: number
  drible: number
  overall: number
  anoNascimento: number
  destaque: boolean
  preco: number
  comercio: boolean
  foto: string
  descricao: string
  raridade: string
  nacionalidade: NacionalidadeI
  nacionalidadeId: number,
  clienteId: number,
  adminId: number
}