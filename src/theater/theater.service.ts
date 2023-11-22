import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theater } from './schemas/theater.schema';
import { Model } from 'mongoose';
import { CustomException } from '../utils/exception.util';
import { ExceptionMessage, HttpStatusMessage } from '../interface/enum';
import { AddTheaterDto } from './dto/add.theater.dto';
import { AcceptAny } from 'src/interface/type';


@Injectable()
export class TheaterService {

    constructor(
        @InjectModel(Theater.name) private TheaterModel: Model<Theater>,
    ){}

    async getTheaters(): Promise<any> {
        try {
            return await this.TheaterModel.find(
                {},
                { location: 1, _id: 0 }
            ).limit(5);
        }
        catch (error) {
            throw error;
        }
    }


    async getTheaterById(theaterId: string): Promise<any> {
        try {
            return await this.TheaterModel.findById(theaterId)

        } catch (error) {
            // throw new CustomException(ExceptionMessage.ERROR_IN_THEATER_FETCHING, HttpStatusMessage.BAD_REQUEST).getError();
            throw new NotFoundException;
        }
    }


    async addTheater(addTheaterDto: AddTheaterDto): Promise<AcceptAny> {
        try {
            const theaterId = addTheaterDto.theaterId;
            const existingTheater = await this.TheaterModel.findOne({ theaterId });
            if (existingTheater) {
                throw new CustomException(ExceptionMessage.THEATER_ALREADY_EXIST, HttpStatusMessage.CONFLICT).getError();
            }

            new this.TheaterModel(addTheaterDto).save();
            return;
        }
        catch (error) {
            throw error;
        }

    }


}
