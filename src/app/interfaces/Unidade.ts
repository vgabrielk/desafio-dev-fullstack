import { Consumo } from "./Consumo"

export interface Unidade {
    id: string
    codigoDaUnidadeConsumidora: string //Único
    modeloFasico: 'monofasico' | 'bifasico' | 'trifasico'
    enquadramento: 'AX' | 'B1' | 'B2' | 'B3'
    historicoDeConsumoEmKWH: Consumo[]
  }