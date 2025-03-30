/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  endereco: string;

  @Prop({ required: true })
  telefone: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
