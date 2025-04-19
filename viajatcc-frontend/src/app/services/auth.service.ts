import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  isBrowser!: boolean;
  constructor(private http: HttpClient) { 
    this.isBrowser = typeof window !== 'undefined';
  }
  login(email: string, password: string) {
    const data = {
      email,
      password
    }
    return this.http.post<any>(`${this.apiUrl}/users/login`, data)
  }
  signin(senha: string, cpf: string, nome: string, email: string) {
    const data = {
      senha,
      cpf,
      nome,
      email,
      idade: 23
    }
    return this.http.post<any>(`${this.apiUrl}/users`, data)
  }
  saveToken(id: string) {
    if (this.isBrowser) {
      localStorage.setItem('authToken', id);
    }
  }
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
