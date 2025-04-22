import { Component } from '@angular/core';
import { user, UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user!: user
  token: string | null = ''
  constructor(private userService: UserService, private authService: AuthService) {
    this.token = this.authService.getToken()
    this.userService.getUser(this.token).subscribe({
      next: (response) => {
        this.user = response
        console.log(response);
      }
    })
  }
}
