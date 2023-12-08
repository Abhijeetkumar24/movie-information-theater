import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TheaterModule } from './theater/theater.module';
import { GuardsModule } from './guards/guards.module';



@Module({
  imports: [

    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URL
      }),
    }),
    ConfigModule.forRoot({isGlobal: true,}),

    TheaterModule,

    GuardsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
