import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  registerForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    // Inicialize o formulário com os controles e validadores
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],  // Adicionando validadores
      password: ['', [Validators.required]],   // Adicionando validadores
      password_confirmation: ['', [Validators.required]],   // Adicionando validadores
      cpf: ['', [Validators.required]],   // Adicionando validadores
      email: ['', [Validators.required]],   // Adicionando validadores
      idade: [0, [Validators.required]],   // Adicionando validadores 
    });
  }
  onSubmit() {
    const {name, password, cpf, email, idade} = this.registerForm.value

    console.log(name, password, cpf, );
    this.authService.signin(password, cpf, name, email, idade).subscribe({next: (response) => {
      this.route.navigate(['/auth/login'])
    }})
  }
}
