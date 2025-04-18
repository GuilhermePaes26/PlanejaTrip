import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  logForm!: FormGroup;  // Defina a variável do FormGroup
  errorMessage: string = '';

  constructor(private fb: FormBuilder) { }

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
      // Faça algo com os dados, como chamar um serviço de login, por exemplo
      console.log('Login com:', username, password);
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente!';
    }
  }
}
