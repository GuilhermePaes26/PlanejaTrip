/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } }) // 👈 habilita virtuals
export class Supplier {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  endereco: string;

  @Prop({ required: true })
  telefone: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);

// 👇 virtual populate aqui
SupplierSchema.virtual('onibus', {
  ref: 'Bus', // precisa ser igual ao nome do model do ônibus
  localField: '_id',
  foreignField: 'fornecedor_id',
});
