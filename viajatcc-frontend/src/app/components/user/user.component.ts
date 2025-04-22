import { Component } from '@angular/core';
import { user, UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CnpjPipe } from '../../cnpj.pipe';
@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user!: user
  token: string | null = ''
  constructor(private userService: UserService, private authService: AuthService) {
    this.token = this.authService.getToken()
    this.userService.getUser(this.token).subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }
}
