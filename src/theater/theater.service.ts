import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theater } from './schemas/theater.schema';
import { Model } from 'mongoose';
import { ExceptionMessage, } from '../interface/enum';
import { AddTheaterDto } from './dto/add.theater.dto';


@Injectable()
export class TheaterService {

    constructor(
        @InjectModel(Theater.name) private TheaterModel: Model<Theater>,
    ) { }

    /**
     * Retrieves theaters.
     *
     * @returns {Promise<any>} A Promise that resolves with the list of theaters.
     * @throws {Error} Throws an error if there is an issue during the retrieval of theaters.
     */
    async getTheaters(): Promise<any> {

        const theaters = await this.TheaterModel.find({}, { location: 1, _id: 0 });

        if (!theaters || theaters.length === 0) {
            throw new NotFoundException(ExceptionMessage.NO_THEATERS_FOUND)
        }

        return theaters;
    }


    /**
     * Retrieves a theater by its ID.
     *
     * @param {string} theaterId - The ID of the theater to retrieve.
     * @returns {Promise<any>} A Promise that resolves with the details of the theater.
     * @throws {Error} Throws an error if there is an issue during the retrieval of the theater.
     */
    async getTheaterById(theaterId: string): Promise<any> {

        const theater = await this.TheaterModel.findById(theaterId);
        if (!theater) {
            throw new NotFoundException(ExceptionMessage.THEATER_NOT_FOUND)
        }
        return theater;
    }



    /**
     * Adds a new theater.
     *
     * @param {AddTheaterDto} addTheaterDto - The data for the new theater.
     * @returns {Promise<any>} A Promise that resolves when the theater is added successfully.
     * @throws {Error} Throws an error if there is an issue during the addition of the theater.
     */
    async addTheater(addTheaterDto: AddTheaterDto): Promise<any> {

        const theaterId = addTheaterDto.theaterId;
        const existingTheater = await this.TheaterModel.findOne({ theaterId });
        if (existingTheater) {
            throw new ConflictException(ExceptionMessage.THEATER_ALREADY_EXIST);
        }
        const newTheater = await this.TheaterModel.create(addTheaterDto);
        return newTheater;


    }


}
