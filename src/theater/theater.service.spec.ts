import { Test, TestingModule } from '@nestjs/testing';
import { TheaterService } from './theater.service';
import { Model, Query } from 'mongoose';
import { Theater } from './schemas/theater.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CustomException } from '../utils/exception.util';
import { ExceptionMessage, HttpStatusMessage } from '../interface/enum';
import { NotFoundException } from '@nestjs/common';

describe('TheaterService', () => {
  let theaterService: TheaterService;
  let theaterModel: Model<Theater>;
  let customException: CustomException;
  let exceptionMessage: ExceptionMessage;
  let httpStatusMessage: HttpStatusMessage;

  const mockTheaterService = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
  };

  const mockTheater = {
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
        CustomException,
        {
          provide: getModelToken(Theater.name),
          useValue: mockTheaterService,
        },
      ],
    }).compile();

    theaterModel = module.get<Model<Theater>>(getModelToken(Theater.name));
    theaterService = module.get<TheaterService>(TheaterService);
    customException = module.get<CustomException>(CustomException);
  });

  it('should be defined', () => {
    expect(theaterService).toBeDefined();
  });

  describe('getTheaters', () => {
    it('should return an array of theater', async () => {

      const mockTheaters = [mockTheater];
      jest.spyOn(theaterModel, 'find').mockReturnValueOnce({
        limit: jest.fn().mockResolvedValueOnce(mockTheaters),
      } as unknown as Query<unknown[], unknown, {}, Theater, 'find'>);

      const result = await theaterService.getTheaters();

      expect(theaterModel.find).toHaveBeenCalledWith({}, { location: 1, _id: 0 });
      expect(result).toEqual(mockTheaters);

    })
  })


  describe('getTheaterByd', () => {
    it('should return a theater by ID', async () => {

      jest.spyOn(theaterModel, 'findById').mockResolvedValueOnce(mockTheater);

      const result = await theaterService.getTheaterById('mockId');

      expect(theaterModel.findById).toHaveBeenCalledWith('mockId');
      expect(result).toEqual(mockTheater);
    });

    it('should throw a CustomException for an error in fetching a theater', async () => {

      jest.spyOn(theaterModel, 'findById').mockRejectedValueOnce(new Error('Mocked error'));
      await expect(theaterService.getTheaterById('mockId')).rejects.toThrow(
        NotFoundException,
      )
    });
  })

 

});
