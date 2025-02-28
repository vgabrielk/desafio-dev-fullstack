import { InformacaoDaFatura } from 'src/interfaces/Simulacao';

export class CreateLeadDto {
  nome!: string;

  email: string;

  telefone: string;

  contasEnergia?: string[];

  file?: Express.Multer.File;

  informacoesDaFatura?: InformacaoDaFatura[];
}
