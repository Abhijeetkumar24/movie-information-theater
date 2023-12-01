import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MSG } from './interface/enum';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import { WINSTON } from './constant/constants';



async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          filename: WINSTON.ERROR_LOG_FILE_NAME, 
          level: WINSTON.ERROR_LEVEL,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: WINSTON.DATE_PATTERN,
          zippedArchive: false, 
          maxFiles: WINSTON.MAX_FILES, 
        }),
        
        new transports.DailyRotateFile({
          filename: WINSTON.COMMON_LOG_FILE_NAME,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: WINSTON.DATE_PATTERN,
          zippedArchive: false,
          maxFiles: WINSTON.MAX_FILES,
        }),
        new transports.Console({
         format: format.combine(
           format.cli(),
           format.splat(),
           format.timestamp(),
           format.printf((info) => {
             return `${info.timestamp} ${info.level}: ${info.message}`;
           }),
          ),
      }),
      ],
    }),
  });

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
