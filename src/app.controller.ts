import {Body, Controller, Post, UploadedFile, UseInterceptors,} from '@nestjs/common';
import {AppService} from './app.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {Multer} from 'multer';
import {IsIn, IsNotEmpty, MaxLength} from 'class-validator';
import {Currency} from '@tatumio/tatum';

class Nft {
  @IsNotEmpty()
  @MaxLength(100)
  public name: string;

  @IsNotEmpty()
  @MaxLength(100)
  public description: string;

  @IsNotEmpty()
  @MaxLength(100)
  @IsIn([Currency.MATIC, Currency.BSC, Currency.FLOW])
  public chain: Currency;

  @IsNotEmpty()
  @MaxLength(3000)
  public token: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mint')
  @UseInterceptors(FileInterceptor('file'))
  public async createNFT(
    @UploadedFile() file: Multer.File,
    @Body() { name, description, chain, token }: Nft,
  ) {
    return this.appService.createNFT(file.buffer, name, description, chain, token);
  }
}
