import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(helmet());
  const configService = app.get(ConfigService);
  const PORT = configService.get('port');
  const config = new DocumentBuilder()
    .setTitle('Advanced auth AA ')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('AA')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  try {
    await app.listen(PORT);
    console.log(`app started on port ${PORT}`);
    console.log('Environments are', configService);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
