import { Component, input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { user, UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  nome: string = '';
  imageUser: string = '';
  home: boolean = false;
  trips: boolean = false;
  menu: boolean = true;
  user!: user;
  token: string | null = '';
  onClick(bol: boolean) {
    const sidebar: any = document.getElementById('sidebar');
    const sidebarNav: any = document.getElementById('sidebar-nav');
    sidebar.classList.toggle('closed');
    sidebarNav.classList.toggle('closed');
  }

  constructor(
    private router: Router,
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
  ngOnInit() {
    this.nome = localStorage.getItem('userName') || '';
    this.imageUser =
      localStorage.getItem('imageUser') || 'assets/default-avatar.jpg';
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
}
