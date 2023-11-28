import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { ExceptionMessage, HttpStatusMessage, Role, SuccessMessage } from 'src/interface/enum';
import { AuthGuard } from 'src/guards/guards.service';
import { responseUtils } from 'src/utils/response.util';
import { TheaterService } from './theater.service';
import { Request, Response } from 'express';
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
    async getMovies(@Res() res: Response): Promise<void> {
        try {
            const response = await this.theaterService.getTheaters();
            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.THEATERS_FETCH_SUCCESSFULLY,
                HttpStatusMessage.OK
            )
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.ERROR_IN_THEATERS_FETCH,
            );
            res.status(err.code).send(err);
        }

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
    async GetMovieById(@Param('id') theaterId: string, @Req() req: Request, @Res() res: Response,): Promise<void> {
        try {
            const response = await this.theaterService.getTheaterById(theaterId);
            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.THEATER_FETCH_SUCCESSFULLY,
                HttpStatusMessage.OK
            )
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.ERROR_IN_THEATER_FETCHING,
            );
            res.status(err.code).send(err);
        }

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
    async addTheater(@Body() addTheaterDto: AddTheaterDto, @Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const response = await this.theaterService.addTheater(addTheaterDto);
            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.ADD_THEATER_SUCCESSFULLY,
                HttpStatusMessage.OK
            )
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.ERROR_IN_THEATER_ADDING,
            );
            res.status(err.code).send(err);
        }

    }



}

