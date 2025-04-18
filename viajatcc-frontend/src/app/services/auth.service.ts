import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  login(email: string, password: string) {
    const data = {
      email,
      password
    }
    return this.http.post<any>(`${this.apiUrl}/users/login`, data)
  }
  signin(senha: string, cpf: string, nome: string, email: string, idade: number) {
    const data = {
      senha,
      cpf,
      nome,
      email,
      idade
    }
    return this.http.post<any>(`${this.apiUrl}/users`, data)
  }
}
