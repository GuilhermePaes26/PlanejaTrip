import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  logForm!: FormGroup;  // Defina a variável do FormGroup
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    // Inicialize o formulário com os controles e validadores
    this.logForm = this.fb.group({
      username: ['', [Validators.required]],  // Adicionando validadores
      password: ['', [Validators.required]]   // Adicionando validadores
    });
  }

  // Função que será chamada no submit do formulário
  onLogin() {
    if (this.logForm.valid) {
      const { username, password } = this.logForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
            this.authService.saveToken(response._id)
            this.route.navigate(['/home'])
          } else {
            this.errorMessage = 'Usuário ou senha incorreto'
          }
        }
      })
      console.log('Login com:', username, password);
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente!';
    }
  }
}
