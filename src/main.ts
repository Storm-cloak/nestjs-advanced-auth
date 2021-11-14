import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Express from 'express';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationConfigInterface } from './config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //config
  const configService: ConfigService<ApplicationConfigInterface> =
    app.get(ConfigService);
  const PORT = configService.get('SERVER_PORT');
  //middlewares
  app.use(helmet());
  app.use(Express.json({ limit: '50mb' }));
  app.use(Express.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();

  //swagger configuration
  const docConfig = new DocumentBuilder()
    .setTitle('Reservation A class ')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('AA')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  //start the server
  try {
    await app.listen(PORT);
    console.log(`app started on port ${PORT}`);
    console.log('Environments are', configService);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
