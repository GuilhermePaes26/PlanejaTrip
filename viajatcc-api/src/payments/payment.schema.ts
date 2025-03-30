/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  usuario_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Trip', required: true })
  viagem_id: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  metodo: string;

  @Prop({ required: true })
  data_pagamento: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
