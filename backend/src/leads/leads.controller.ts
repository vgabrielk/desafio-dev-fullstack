import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import File from 'src/interfaces/File';
import { FindLeadsQueryDto } from './dto/find-leads.query.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createLeadDto: CreateLeadDto, @UploadedFile() file: File) {
    console.log(file);
    return this.leadsService.simular(createLeadDto, file);
  }

  @Get()
  findAll(@Query() query: FindLeadsQueryDto) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }
}
