/* eslint-disable prettier/prettier */
export class CreatePaymentDto {
  usuario_id: string;
  viagem_id: string;
  valor: number;
  metodo: string;
  data_pagamento: Date;
}
