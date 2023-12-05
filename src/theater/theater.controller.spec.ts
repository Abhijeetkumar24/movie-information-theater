import { Test, TestingModule } from '@nestjs/testing';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '../guards/guards.service';

describe('UsersController', () => {
    let controller: TheaterController;

    const mock_AuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const mockTheaterService = {
        getTheaters: jest.fn(),
        getTheaterById: jest.fn(),
        addTheater: jest.fn(),
    };

    const theater = {
        theaterId: 1010,
        location: {
            address: {
                street1: "1025 Veterans Pkwy",
                city: "Clarksville",
                state: "IN",
                zipcode: "47129"
            },
            geo: {
                type: "Point",
                coordinates: [
                    -85.76461,
                    38.327175
                ]
            }
        }
    };


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TheaterController],
            providers: [
                {
                    provide: TheaterService,
                    useValue: mockTheaterService,
                },
            ],
        })
            .overrideGuard(AuthGuard).useValue(mock_AuthGuard)
            .compile();

        controller = module.get<TheaterController>(TheaterController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });


    describe('getTheaters', () => {
        it('should return an array of theater ', async () => {
            const theaters = [theater];

            jest.spyOn(mockTheaterService, 'getTheaters').mockReturnValue(theaters);

            const result = await controller.GetAllTheaters();

            expect(mockTheaterService.getTheaters).toHaveBeenCalled();
            expect(result).toEqual({ message: 'Theaters fetch successfully', data: theaters });
        });
    });


    describe('getTheaterById', () => {
        it('should find a theater by a given id and return its data ', async () => {

            const id = '59a47286cfa9a3a73e51e72c';

            jest.spyOn(mockTheaterService, 'getTheaterById').mockReturnValue(theater);

            const result = await controller.GetTheaterById(id);

            expect(mockTheaterService.getTheaterById).toHaveBeenCalledWith(id);
            expect(result).toEqual({ message: 'Theater fetch successfully', data: theater });

        });

    });


    describe('addTheater', () => {
        it('should create a theater by a given data ', async () => {

            jest.spyOn(mockTheaterService, 'addTheater').mockReturnValue(theater);

            const result = await controller.AddTheater(theater);

            expect(mockTheaterService.addTheater).toHaveBeenCalledWith(theater);
            expect(result).toEqual({ message: 'Theater added successfully', data: theater });

        });

    });


});