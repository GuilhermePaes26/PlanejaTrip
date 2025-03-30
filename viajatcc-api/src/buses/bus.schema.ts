/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BusDocument = Bus & Document;

@Schema()
export class Bus {
  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  capacidade: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  })
  fornecedor_id: string;
}

export const BusSchema = SchemaFactory.createForClass(Bus);
