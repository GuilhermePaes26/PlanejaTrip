/* eslint-disable prettier/prettier */
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  senha: string;
}
