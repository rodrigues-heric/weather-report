import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>;

@Schema({ _id: false })
export class Forecast {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  condition: string;

  @Prop({ required: true })
  minTemperature: number;

  @Prop({ required: true })
  maxTemperature: number;
}

export const ForecastSchema = SchemaFactory.createForClass(Forecast);

@Schema({ _id: false })
export class Hourly {
  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  condition: string;

  @Prop({ required: true })
  temperature: number;
}

export const HourlySchema = SchemaFactory.createForClass(Hourly);

@Schema({ timestamps: true })
export class City extends Document {
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

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: [ForecastSchema], default: [] })
  forecast?: Forecast[];

  @Prop({ type: [HourlySchema], default: [] })
  hourly?: Hourly[];
}

export const CitySchema = SchemaFactory.createForClass(City);
