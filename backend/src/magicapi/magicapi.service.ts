import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as FormData from 'form-data';
import File from 'src/interfaces/File';
import { firstValueFrom } from 'rxjs';
import { FaturaDecodificada } from 'src/interfaces/Simulacao';

@Injectable()
export class MagicapiService {
  constructor(private readonly httpService: HttpService) {}

  async decodificarContaDeEnergia(file: File): Promise<FaturaDecodificada> {
    if (!file.mimetype || !file.buffer) {
      throw new HttpException(
        { message: 'Arquivo inválido', field: 'file' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      const response = this.httpService.post<FaturaDecodificada>(
        'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );

      const axiosResponse = await firstValueFrom(response);
      return axiosResponse.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao decodificar a fatura:', error?.message || error);
      }

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: 'Falha ao decodificar a conta de energia.',
            details: error || error.message,
            field: 'file',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
