import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface payment {
  usuario_id?: string;
  viagem_id?: string;
  valor: number;
  metodo: string;
  data_de_pagamento: Date;
  
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  apiUrl: string = 'http://localhost:3000/payments'
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get<payment[]>(this.apiUrl)
  }
}
