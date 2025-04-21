import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  isBrowser!: boolean;

  private authChecked = new BehaviorSubject<boolean>(false);
  authChecked$ = this.authChecked.asObservable();

  constructor(private http: HttpClient) { 
    this.isBrowser = typeof window !== 'undefined';
    if (this.isBrowser) {

      this.checkAuth();
    }
  }
  
  checkAuth() {
    // Simula verificação (ex: token no storage)
    const token = sessionStorage.getItem('authToken');
    if (token) {
      // pode fazer algo como validar na API se quiser
    }
    // Após checar, avisamos que terminou a verificação
    this.authChecked.next(true);
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
      sessionStorage.setItem('authToken', id);
    }
  }
  getToken(): string | null {
    if (this.isBrowser) {
      return sessionStorage.getItem('authToken');
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (this.isBrowser) {
      return !!sessionStorage.getItem('authToken');
    } else {
      return false
    }
  }
}
