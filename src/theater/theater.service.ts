import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theater } from './schemas/theater.schema';
import { Model, isValidObjectId } from 'mongoose';
import { CustomException } from '../utils/exception.util';
import { ExceptionMessage, HttpStatusMessage } from '../interface/enum';
import { AddTheaterDto } from './dto/add.theater.dto';
import { Logger } from 'winston';



@Injectable()
export class TheaterService {

    private readonly logger = new Logger();


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
        try {
        
            const theaters = await this.TheaterModel.find({}, { location: 1, _id: 0 });

            if (!theaters || theaters.length === 0) {
                throw new CustomException(ExceptionMessage.NO_THEATERS_FOUND, HttpStatusMessage.NOT_FOUND).getError();
            }

            return theaters;
        }
        catch (error) {
            this.logger.warn(error);
            throw error;
        }
    }


    /**
     * Retrieves a theater by its ID.
     *
     * @param {string} theaterId - The ID of the theater to retrieve.
     * @returns {Promise<any>} A Promise that resolves with the details of the theater.
     * @throws {Error} Throws an error if there is an issue during the retrieval of the theater.
     */
    async getTheaterById(theaterId: string): Promise<any> {
        try {
            
            if (!isValidObjectId(theaterId)) {
                throw new CustomException(ExceptionMessage.INVALID_THEATER_ID, HttpStatusMessage.BAD_REQUEST).getError();
            }
    
            const theater = await this.TheaterModel.findById(theaterId);
    
            if (!theater) {
                throw new CustomException(ExceptionMessage.THEATER_NOT_FOUND, HttpStatusMessage.NOT_FOUND).getError();
            }
    
            return theater;
        } catch (error) {
            this.logger.warn(error);
            throw error;
        }
    }
    


    /**
     * Adds a new theater.
     *
     * @param {AddTheaterDto} addTheaterDto - The data for the new theater.
     * @returns {Promise<any>} A Promise that resolves when the theater is added successfully.
     * @throws {Error} Throws an error if there is an issue during the addition of the theater.
     */
    async addTheater(addTheaterDto: AddTheaterDto): Promise<any> {
        try {

            if (!addTheaterDto.theaterId) {
                throw new CustomException(ExceptionMessage.INVALID_THEATER_ID, HttpStatusMessage.BAD_REQUEST).getError();
            }

            const theaterId = addTheaterDto.theaterId;
            const existingTheater = await this.TheaterModel.findOne({ theaterId });
            if (existingTheater) {
                throw new CustomException(ExceptionMessage.THEATER_ALREADY_EXIST, HttpStatusMessage.CONFLICT).getError();
            }

            new this.TheaterModel(addTheaterDto).save();
            return;
        }
        catch (error) {
            this.logger.warn(error);
            throw error;
        }

    }


}
