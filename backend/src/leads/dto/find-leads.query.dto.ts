import { IsOptional, IsString, IsDateString } from 'class-validator';

export class FindLeadsQueryDto {
  @IsOptional()
  @IsString()
  nomeCompleto?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @IsOptional()
  @IsDateString()
  dataFim?: string;

  @IsOptional()
  @IsString()
  unidadeConsumidora?: string;

  @IsOptional()
  consumoMin?: number;

  @IsOptional()
  consumoMax?: number;
}
