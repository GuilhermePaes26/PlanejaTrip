import { Component, input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { user, UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  home: boolean = false
  trips: boolean = false
  menu: boolean = true;
  user!: user
  token: string | null = ''
  onClick(bol: boolean) {
    this.menu = bol
  }

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
    this.token = this.authService.getToken()
    this.userService.getUser(this.token).subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }
}
