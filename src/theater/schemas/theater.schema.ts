import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TheaterDocument = HydratedDocument<Theater>;

@Schema()
export class Theater {

    @Prop()
    theaterId: number;

    @Prop({
        type: {
            address: {
                street1: String,
                city: String,
                state: String,
                zipcode: String,
            },
            geo: {
                type: { type: String },
                coordinates: [Number],
            },
        },
    })
    location: {
        address: {
            street1: string;
            city: string;
            state: string;
            zipcode: string;
        };
        geo: {
            type: string;
            coordinates: [number, number];
        };
    };

}

export const TheaterSchema = SchemaFactory.createForClass(Theater);
