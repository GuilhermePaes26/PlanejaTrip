import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlreadyLoggedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home/dashboard']); // ou qualquer rota protegida
      return false; // impede acesso à rota atual
    }
    return true; // permite acesso se não estiver logado
  }
}