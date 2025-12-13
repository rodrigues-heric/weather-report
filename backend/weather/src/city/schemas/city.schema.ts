import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>;

@Schema()
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  condition: string;

  @Prop({ required: true })
  minTemperature: number;

  @Prop({ required: true })
  maxTemperature: number;

  @Prop({ required: true })
  feelsLike: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ required: true })
  pressure: number;

  @Prop({ required: true })
  visibility: number;

  @Prop({ required: true })
  windSpeed: number;

  @Prop({ required: true })
  uvIndex: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
