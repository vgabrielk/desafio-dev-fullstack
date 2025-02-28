export interface SolicitarSimulacaoDeCompensacaoEnergeticaInput {
  nomeCompleto: string;
  email: string;
  telefone: string;
  informacoesDaFatura: InformacaoDaFatura[];
}
export interface InformacaoDaFatura {
  codigoDaUnidadeConsumidora: string;
  modeloFasico: string;
  enquadramento: string;
  mesDeReferencia: Date;
  consumoEmReais: number;
  historicoDeConsumoEmKWH: {
    consumoForaPontaEmKWH: number;
    mesDoConsumo: Date;
  }[];
}

export interface FaturaDecodificada {
  valor: number;
  barcode: string;
  chargingModel: string;
  phaseModel: 'monofasico' | 'bifasico' | 'trifasico';
  unit_key: string;
  invoice: {
    consumo_fp: number;
    consumo_date: string;
  }[];
  energy_company_id: string;
}
