import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        cnpj: [
          '',
          [
            Validators.required,
            Validators.minLength(14),
            Validators.maxLength(14),
          ],
        ],
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmSenha: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('senha')?.value;
    const confirm = form.get('confirmSenha')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = this.registerForm.errors?.['passwordsMismatch']
        ? 'As senhas não conferem!'
        : 'Preencha todos os campos corretamente!';
      return;
    }

    const { cnpj, nome, email, senha } = this.registerForm.value;
    this.authService
      .signup({
        cpf: cnpj,
        nome,
        email,
        senha,
        idade: 0,
      })
      .subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: (err) => {
          console.error('Erro no cadastro', err);
          this.errorMessage = 'Falha ao cadastrar. Tente novamente.';
        },
      });
  }

  findcnpj() {
    const cnpjValue = this.registerForm.get('cnpj')?.value;
    if (cnpjValue?.length === 14) {
      fetch(`https://open.cnpja.com/office/${cnpjValue}`, {
        headers: {
          Authorization:
            'Bearer 711499ff-e472-46b9-b3fe-89dfc8209092-09cac35d-e7bb-46e9-a302-c35040e49b51',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.registerForm.patchValue({
            nome: data.company.name,
            email: data.emails?.[0]?.address || '',
          });
        })
        .catch((err) => console.error('Erro na requisição CNPJ', err));
    }
  }
}
