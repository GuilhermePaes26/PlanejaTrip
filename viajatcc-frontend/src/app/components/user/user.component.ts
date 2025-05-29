import { Component, inject } from '@angular/core';
import { user, UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CnpjPipe } from '../../cnpj.pipe';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user!: user;
  token: string | null = '';
  selectedFile: File | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.token = this.authService.getToken();
    this.userService.getUser(this.token).subscribe({
      next: (response) => {
        this.user = response;
      },
    });
  }
  async logout() {
    const confirm = await this.dialog
      .open(ConfirmationDialogComponent, {
        data: 'Deseja realmente sair da conta?',
      })
      .afterClosed()
      .toPromise();
    console.log(confirm);
    if (confirm) {
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      window.location.reload();
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.selectedFile = input.files[0];
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.userService.updateUser(this.user._id!, formData).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        localStorage.setItem(
          'imageUser',
          updatedUser.imgLink || 'assets/default-avatar.jpg'
        );
        this.snackBar.open('Foto de perfil atualizada!', 'OK', {
          duration: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: () => {
        this.snackBar.open('Erro ao atualizar foto. Tente novamente.', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
