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
  cnpj!: string
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    // Inicialize o formulário com os controles e validadores
    this.registerForm = this.fb.group({
      cnpj: ['', [Validators.required]],   // Adicionando validadores
      razao: [{value: '', disabled: true}, [Validators.required]],  // Adicionando validadores
      password: ['', [Validators.required]],   // Adicionando validadores
      password_confirmation: ['', [Validators.required]],   // Adicionando validadores
      email: ['', [Validators.required]],   // Adicionando validadores 
    });
    this.cnpj = this.registerForm.value.cnpj
  }
  onSubmit() {
    const {name, password, cnpj, email} = this.registerForm.value

    console.log(name, password, cnpj, );
    this.authService.signin(password, cnpj, name, email).subscribe({next: (response) => {
      this.route.navigate(['/auth/login'])
    }})
  }
  findcnpj() {
    if (this.registerForm.value.cnpj.length == 14) {
      fetch(`https://open.cnpja.com/office/${this.registerForm.value.cnpj}`, {
        headers: {
          Authorization: 'Bearer 711499ff-e472-46b9-b3fe-89dfc8209092-09cac35d-e7bb-46e9-a302-c35040e49b51'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log('Dados da empresa:', data);
          this.registerForm.patchValue({
            razao: data.company.name
          });
          this.registerForm.patchValue({
            email: data.emails[0].address
          });
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
  }
}
