import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MSG } from './interface/enum';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(MSG.THEATER_MICROSERVICE)
    .setDescription(MSG.THEATER_DESCRIPTION)
    .setVersion(MSG.SET_VERSION)
    .addTag(MSG.ADD_TAG)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(MSG.API, app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
