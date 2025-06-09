import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService, user } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  logForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.logForm.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente!';
      return;
    }

    const { email, senha } = this.logForm.value;
    this.authService.login(email, senha).subscribe({
      next: ({ access_token }) => {
        this.authService.saveToken(access_token);

        const payload = JSON.parse(atob(access_token.split('.')[1]));
        const userId = payload.sub as string;

        this.usersService.getUser(userId).subscribe({
          next: (user: user) => {
            localStorage.setItem('userName', user.nome);
            localStorage.setItem(
              'imageUser',
              user.imgLink ?? 'assets/default-avatar.jpg'
            );
            this.router.navigate(['/home/dashboard']);
          },
          error: () => {
            this.errorMessage = 'Não foi possível carregar dados do usuário.';
          },
        });
      },
      error: () => {
        this.errorMessage = 'Usuário ou senha incorretos';
      },
    });
  }
}
