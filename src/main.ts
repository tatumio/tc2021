import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.env.TATUM_API_KEY = '4966d428-9507-45cb-9f90-02cca00674bd_100'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
