import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from './trips.service';

export interface user {
  _id: string,
  senha: string,
  cpf: string,
  nome: string,
  email: string,
  idade: number,
  viagens: Trip,
  pagamentos: {},
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }
  getUser(id: string | null) {
    return this.http.get<user>(`${this.apiUrl}/${id}`)
  }
}
