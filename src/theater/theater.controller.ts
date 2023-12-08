import { Body, Controller, Get, Param, Post, UseGuards, } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { Role, SuccessMessage } from '../interface/enum';
import { AuthGuard } from '../guards/guards.service';
import { TheaterService } from './theater.service';
import { AddTheaterDto } from './dto/add.theater.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Theater')
@ApiBearerAuth()
@Controller('theater')
export class TheaterController {

    constructor(
        private theaterService: TheaterService,

    ) { }


    /**
     * Retrieves theaters.
     *
     * @returns {Promise<void>} A Promise that resolves with the list of theaters.
     * @throws {Error} Throws an error if there is an issue during the retrieval of theaters.
     */
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get Theaters', description: 'Endpoint to retrieve theaters.' })
    @Get()
    async GetAllTheaters(): Promise<any> {
        const response = await this.theaterService.getTheaters();
        return { message: SuccessMessage.THEATERS_FETCH_SUCCESSFULLY, data: response }
    }

    /**
     * Retrieves a theater by its ID.
     *
     * @param {string} theaterId - The ID of the theater to retrieve.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object for sending the result.
     * @returns {Promise<void>} A Promise that resolves with the theater details.
     */
    @Roles(Role.User, Role.Admin)
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get Theater by ID', description: 'Endpoint to retrieve a theater by its ID.' })
    @ApiParam({ name: 'id', description: 'Theater ID' })
    @Get(':id')
    async GetTheaterById(@Param('id') theaterId: string,): Promise<any> {
        const data = await this.theaterService.getTheaterById(theaterId);
        return { message: SuccessMessage.THEATER_FETCH_SUCCESSFULLY, data: data }
    }


    /**
     * Adds a new theater.
     *
     * @param {AddTheaterDto} addTheaterDto - The data for the new theater.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object for sending the result.
     * @returns {Promise<void>} A Promise that resolves when the theater is added successfully.
     */
    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Add Theater', description: 'Endpoint to add a new theater.' })
    @Post()
    async AddTheater(@Body() addTheaterDto: AddTheaterDto): Promise<any> {
        const data = await this.theaterService.addTheater(addTheaterDto);
        return { message: SuccessMessage.ADD_THEATER_SUCCESSFULLY, data: data }
    }

}

