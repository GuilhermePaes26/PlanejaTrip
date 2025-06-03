import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from './trips.service';
import { Observable } from 'rxjs';

export interface user {
  _id: string;
  senha: string;
  cpf: string;
  nome: string;
  email: string;
  idade: number;
  viagens: Trip;
  pagamentos: {};
  imgLink: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'https://planejatrip.onrender.com/users';
  constructor(private http: HttpClient) {}
  getUser(id: string | null) {
    return this.http.get<user>(`${this.apiUrl}/${id}`);
  }
  findAll() {
    return this.http.get<user[]>(`${this.apiUrl}`)
  }
  updateUser(id: string, data: FormData): Observable<user> {
    return this.http.put<user>(`${this.apiUrl}/${id}`, data);
  }
}
