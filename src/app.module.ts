import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TheaterModule } from './theater/theater.module';
import { GuardsModule } from './guards/guards.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Abhijeet:abhijeet@cluster0.dh4tila.mongodb.net/movie_info_theater'),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TheaterModule,

    GuardsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
