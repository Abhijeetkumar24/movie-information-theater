
import { IsNumber, IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
    @IsString()
    street1: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    zipcode: string;
}

class GeoDto {
    @IsString()
    type: string;

    @IsNumber({}, { each: true })
    coordinates: number[];
}

export class LocationDto {
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsObject()
    @ValidateNested()
    @Type(() => GeoDto)
    geo: GeoDto;
}

export class AddTheaterDto {
    @IsNumber()
    theaterId: number;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;
}
