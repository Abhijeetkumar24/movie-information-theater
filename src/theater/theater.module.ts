import { Module } from '@nestjs/common';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Theater, TheaterSchema } from './schemas/theater.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forFeature(
      [
        { name: Theater.name, schema: TheaterSchema },
      ]
    ),

    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.AUTH_GRPC_URL,
          package: process.env.AUTH_PACKAGE,
          protoPath: process.env.AUTH_PROTO_PATH,
        },
      },
    ])
  
  ],
  controllers: [TheaterController],
  providers: [TheaterService]
})
export class TheaterModule {}
