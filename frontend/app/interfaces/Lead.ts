import { Unidade } from "./Unidade"

export interface Lead {
    id: string
    nomeCompleto: string
    email: string // Único
    telefone: string
    unidades: Unidade[]
    createdAt: Date
  }