import { Component, inject } from '@angular/core';
import { user, UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CnpjPipe } from '../../cnpj.pipe';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user!: user
  token: string | null = ''

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog) {
    this.token = this.authService.getToken()
    this.userService.getUser(this.token).subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }
  async logout() {
    const confirm = await this.dialog.open(ConfirmationDialogComponent, {
      data: 'Deseja realmente sair da conta?'
    }).afterClosed().toPromise()
    console.log(confirm)
    if (confirm) {
      sessionStorage.removeItem('authToken')
      window.location.reload()
    }
  }
}
