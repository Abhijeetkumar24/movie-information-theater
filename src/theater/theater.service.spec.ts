
import { Test, TestingModule } from '@nestjs/testing';
import { TheaterService } from './theater.service';
import { Theater } from './schemas/theater.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersService', () => {
    let service: TheaterService;

    const mockTheaterRepository = {
        find: jest.fn(),
        findById: jest.fn(),
        findOne: jest.fn(),
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
        
        
    
    })
    
    it('getTheaterById', () => { });
    it('addTheater', () => { });

});
