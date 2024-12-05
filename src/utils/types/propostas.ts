import { CartaI } from "./cartas"
import { ClienteI } from "./clientes"

export interface PropostaI {
  id: number
  clienteId: string
  cliente: ClienteI
  cartaId: number
  carta: CartaI
  descricao: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}