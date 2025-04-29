import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'crypto';
import { Observable } from 'rxjs';

export interface supplier {
  _id?: string;
  nome: string;
  endereco: string;
  telefone: string;
}
export interface bus {
  _id?: string;
  capacidade: number;
  valor: number;
  fornecedor_id: UUID;
}

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private readonly apiUrl = 'http://localhost:3000/suppliers';
  private readonly apiUrlBus = 'http://localhost:3000/buses';
  constructor(private http: HttpClient) { }
  getSuppliers() {
    return this.http.get<supplier[]>(this.apiUrl)
  }
  createSupplier(supplier: supplier): Observable<supplier> {
    return this.http.post<supplier>(this.apiUrl, supplier)
  }
  deleteSupplier(id: string) {
    return this.http.delete(this.apiUrl + `/${id}`)
  }
  findBus(): Observable<bus[]> {
    return this.http.get<bus[]>(this.apiUrlBus)
  }
}
