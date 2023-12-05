
import { Test, TestingModule } from '@nestjs/testing';
import { TheaterService } from './theater.service';
import { Theater } from './schemas/theater.schema';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
    let service: TheaterService;

    const mockTheaterRepository = {
        find: jest.fn(),
        findById: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
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
            providers: [
                TheaterService,
                {
                    provide: getModelToken(Theater.name),
                    useValue: mockTheaterRepository,
                },
            ],
        }).compile();

        service = module.get<TheaterService>(TheaterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getTheaters', () => {
        it('should return an array of theater ', async () => {

            const theaters = [theater];

            jest.spyOn(mockTheaterRepository, 'find').mockReturnValue(theaters);

            const result = await service.getTheaters();

            expect(mockTheaterRepository.find).toHaveBeenCalled();
            expect(result).toEqual(theaters);

        });


        it('should throw an error if no theaters are found', async () => {
            jest.spyOn(mockTheaterRepository, 'find').mockResolvedValue([]);

            await expect(service.getTheaters()).rejects.toThrow();
        });

    });


    describe('getTheaterById', () => {
        it('should return a theater ', async () => {

            const id = '59a47286cfa9a3a73e51e72c';

            jest.spyOn(mockTheaterRepository, 'findById').mockReturnValue(theater);

            const result = await service.getTheaterById(id);

            expect(mockTheaterRepository.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual(theater);

        });


        it('should throw an error if no theaters are found', async () => {
            const id = '59a47286cfa9a3a73e51e72d';

            jest.spyOn(mockTheaterRepository, 'findById').mockResolvedValue(null);

            await expect(service.getTheaterById(id)).rejects.toThrow();
        });
    })

    describe('addTheater', () => {
        it('should return a new theater ', async () => {

            jest.spyOn(mockTheaterRepository, 'create').mockReturnValue(theater);

            const result = await service.addTheater(theater);

            expect(mockTheaterRepository.create).toHaveBeenCalledWith(theater);
            expect(result).toEqual(theater);

        });

        it('should throw an error if theater already exists', async () => {

            theater.theaterId = 1010;

            jest.spyOn(mockTheaterRepository, 'findOne').mockResolvedValue(theater);

            await expect(service.addTheater(theater)).rejects.toThrow(ConflictException);
        });

    })

});
