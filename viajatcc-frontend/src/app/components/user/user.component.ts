import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class UserComponent implements OnInit {
  user!: user;
  isBrowser = false;
  private userId!: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userId = payload.sub as string;
      } catch {
        console.error('Token inválido');
        return;
      }
      this.userService.getUser(this.userId).subscribe({
        next: (user) => (this.user = user),
        error: (err) => console.error('Erro ao carregar usuário', err),
      });
    }
  }

  async logout() {
    const confirm = await this.dialog
      .open(ConfirmationDialogComponent, {
        data: 'Deseja realmente sair da conta?',
      })
      .afterClosed()
      .toPromise();

    if (confirm && this.isBrowser) {
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('imageUser');
      location.reload();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.userId) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file, file.name);

    this.userService.updateUser(this.userId, formData).subscribe({
      next: (updated) => {
        this.user = updated;
        localStorage.setItem(
          'imageUser',
          updated.imgLink ?? 'assets/default-avatar.jpg'
        );
        this.snackBar.open('Foto de perfil atualizada!', 'OK', {
          duration: 2000,
        });
        setTimeout(() => location.reload(), 2000);
      },
      error: () =>
        this.snackBar.open('Erro ao atualizar foto. Tente novamente.', 'OK', {
          duration: 2000,
        }),
    });
  }
}
