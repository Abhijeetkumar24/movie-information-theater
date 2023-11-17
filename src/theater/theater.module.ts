import { Module } from '@nestjs/common';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Theater, TheaterSchema } from './schemas/theater.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
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
          url: 'localhost:50051',
          package: 'auth',
          protoPath: join(__dirname, '../../../proto/auth.proto'),
        },
      },
    ])
  
  ],
  controllers: [TheaterController],
  providers: [TheaterService]
})
export class TheaterModule {}
