import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(helmet());
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
