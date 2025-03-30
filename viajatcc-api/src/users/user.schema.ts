/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  senha: string;

  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  idade: number;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Trip' }],
    default: [],
  })
  viagens: string[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Payment' }],
    default: [],
  })
  pagamentos: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
