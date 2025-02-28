import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { LeadsModule } from './leads/leads.module';
import { MagicapiService } from './magicapi/magicapi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, LeadsModule, HttpModule],
  controllers: [],
  providers: [AppService, MagicapiService],
})
export class AppModule {}
