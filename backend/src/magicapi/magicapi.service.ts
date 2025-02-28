import { Injectable } from '@nestjs/common';
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
      throw new Error('Invalid file data');
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
        throw new Error(
          `Failha ao decodificar conta: ${error.message || error}`,
        );
      }
    }
  }
}
