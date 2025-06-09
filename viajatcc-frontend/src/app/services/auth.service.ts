import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface LoginResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private authChecked = new BehaviorSubject<boolean>(false);
  authChecked$ = this.authChecked.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.authChecked.next(this.isBrowser && !!this.getToken());
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      email,
      senha,
    });
  }

  signup(data: {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    idade: number;
  }) {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  saveToken(token: string): void {
    if (this.isBrowser) {
      sessionStorage.setItem('authToken', token);
      this.authChecked.next(true);
    }
  }

  getToken(): string | null {
    return this.isBrowser ? sessionStorage.getItem('authToken') : null;
  }

  isAuthenticated(): boolean {
    return this.isBrowser && !!sessionStorage.getItem('authToken');
  }

  logout(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem('authToken');
      this.authChecked.next(false);
    }
  }
}
