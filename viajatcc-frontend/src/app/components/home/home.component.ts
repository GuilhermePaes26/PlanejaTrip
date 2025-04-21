import { Component, input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  home: boolean = false
  trips: boolean = false
  menu: boolean = true;
  isBrowser!: boolean;
  token: string | null = ''
  onClick(bol: boolean) {
    this.menu = bol
  }

  constructor(private router: Router, private authService: AuthService) {
    this.isBrowser = typeof window !== 'undefined';

      if (this.isBrowser) {
        this.token = this.authService.getToken()
      }
      if (!this.token) {
        this.router.navigate(['/auth/login'])
      }
  }
}
