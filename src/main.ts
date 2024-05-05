import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //     new ValidationPipe({
  //         disableErrorMessages: true,
  //
  //         whitelist: true,
  //         forbidNonWhitelisted: true,
  //
  //         transform: true,
  //         transformOptions: {
  //             enableImplicitConversion: true,
  //         },
  //     }),
  // );

  app.use(cookieParser());

  (app as NestExpressApplication).enable('trust proxy');

  await app.listen(3000);
}

bootstrap();
