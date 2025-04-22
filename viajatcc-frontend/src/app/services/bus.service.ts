import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface supplier {
  _id?: string;
  nome: string;
  endereco: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private readonly apiUrl = 'http://localhost:3000/suppliers';
  constructor(private http: HttpClient) { }
  getSuppliers() {
    return this.http.get<supplier[]>(this.apiUrl)
  }
}
