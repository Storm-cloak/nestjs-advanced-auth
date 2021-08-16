import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  try {
    await app.listen(PORT);
    console.log(`app started on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
