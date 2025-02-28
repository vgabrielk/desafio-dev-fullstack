import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MagicapiService } from 'src/magicapi/magicapi.service';

import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly magicapi: MagicapiService,
  ) {}
  async simular(createLeadDto: CreateLeadDto, file: Express.Multer.File) {
    const informacoesDaFatura =
      await this.magicapi.decodificarContaDeEnergia(file);

    console.log('leads', createLeadDto);

    if (!informacoesDaFatura || !informacoesDaFatura.invoice) {
      throw new HttpException(
        'Dados da fatura inválidos ou ausentes',
        HttpStatus.CONFLICT,
      );
    }

    const existingEmail = await this.prisma.lead.findFirst({
      where: {
        email: createLeadDto.email,
      },
    });
    const existingUnidade = await this.prisma.unidade.findFirst({
      where: {
        codigoDaUnidadeConsumidora: informacoesDaFatura.unit_key,
      },
    });

    if (existingEmail) {
      throw new HttpException(
        'Simulação com o mesmo email já existe.',
        HttpStatus.CONFLICT,
      );
    }
    if (existingUnidade) {
      throw new HttpException(
        'Unidade com o mesmo código já existe.',
        HttpStatus.CONFLICT,
      );
    }
    const lead = await this.prisma.lead.create({
      data: {
        nomeCompleto: createLeadDto.nome,
        email: createLeadDto.email,
        telefone: createLeadDto.telefone,
        unidades: {
          create: [
            {
              codigoDaUnidadeConsumidora: informacoesDaFatura.unit_key,
              modeloFasico: informacoesDaFatura.phaseModel,
              enquadramento: informacoesDaFatura.chargingModel,
              historicoDeConsumoEmKWH: {
                create: informacoesDaFatura.invoice?.map(
                  (consumo: {
                    consumo_fp: any;
                    consumo_date: string | number | Date;
                  }) => ({
                    consumoForaPontaEmKWH: Number(consumo.consumo_fp),
                    mesDoConsumo: new Date(consumo.consumo_date),
                  }),
                ),
              },
            },
          ],
        },
      },
    });
    return lead;
  }

  findAll(filters: {
    nomeCompleto?: string;
    email?: string;
    telefone?: string;
    dataInicio?: string;
    dataFim?: string;
    unidadeConsumidora?: string;
    consumoMin?: number;
    consumoMax?: number;
  }) {
    return this.prisma.lead.findMany({
      where: {
        nomeCompleto: filters.nomeCompleto
          ? { contains: filters.nomeCompleto }
          : undefined,
        email: filters.email ? { contains: filters.email } : undefined,
        telefone: filters.telefone ? { contains: filters.telefone } : undefined,
        createdAt:
          filters.dataInicio || filters.dataFim
            ? {
                gte: filters.dataInicio
                  ? new Date(filters.dataInicio)
                  : undefined,
                lte: filters.dataFim ? new Date(filters.dataFim) : undefined,
              }
            : undefined,
        unidades: {
          some: {
            codigoDaUnidadeConsumidora: filters.unidadeConsumidora
              ? { equals: filters.unidadeConsumidora }
              : undefined,
            historicoDeConsumoEmKWH:
              filters.consumoMin || filters.consumoMax
                ? {
                    some: {
                      consumoForaPontaEmKWH: {
                        gte: filters.consumoMin || undefined,
                        lte: filters.consumoMax || undefined,
                      },
                    },
                  }
                : undefined,
          },
        },
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.lead.findFirst({
      where: { id },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });
  }
}
