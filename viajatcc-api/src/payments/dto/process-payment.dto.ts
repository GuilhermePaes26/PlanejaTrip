/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CardInfo {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsNumber()
  exp_month: number;

  @IsNumber()
  exp_year: number;

  @IsString()
  @IsNotEmpty()
  cvc: string;
}

export class ProcessPaymentDto {
  @IsString()
  @IsNotEmpty()
  usuario_id: string;

  @IsString()
  @IsNotEmpty()
  viagem_id: string;

  @IsNumber()
  valor: number;

  @IsObject()
  @ValidateNested()
  @Type(() => CardInfo)
  card: CardInfo;
}
