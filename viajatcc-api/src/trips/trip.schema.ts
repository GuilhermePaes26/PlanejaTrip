/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TripDocument = Trip & Document;

@Schema()
export class Trip {
  @Prop({ required: true })
  nome: string;

  @Prop()
  descricao: string;

  @Prop({ required: true })
  preco: number;

  @Prop({ required: true })
  data: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bus', required: true })
  onibus: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  passageiros: string[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);
