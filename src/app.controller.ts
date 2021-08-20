import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mint')
  @UseInterceptors(FileInterceptor('file'))
  public async createNFT(
    @UploadedFile() file: Multer.File,
    @Body() { name, description, chain }: any,
  ) {
    return this.appService.createNFT(file.buffer, name, description, chain);
  }
}
