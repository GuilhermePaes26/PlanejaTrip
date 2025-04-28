import { Component, OnInit } from '@angular/core';
import { BusService, supplier } from '../../../services/bus.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-fornecedor',
  standalone: true,
  templateUrl: './form-fornecedor.component.html',
  styleUrl: './form-fornecedor.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule // outros módulos que ele usa
  ]
})
export class FormFornecedorComponent implements OnInit {
  supplierForm!: FormGroup
  supplierId: string | null = ''

  constructor(private busService: BusService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.supplierForm = this.fb.group({
      cnpj: ['', Validators.required],
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.supplierId = this.route.snapshot.paramMap.get('id');
  }
  onsubmit() {
    const {nome, endereco, telefone} = this.supplierForm.value
    const data: supplier = {
      nome,
      endereco,
      telefone
    }
    this.busService.createSupplier(data).subscribe({
      next: response => {
        this.dialog.closeAll()
        window.location.reload()
        this.snackBar.open('Fornecedor criado', 'fechar', {
          duration: 3000
        })
      }
    })
  }
  findcnpj() {
    if (this.supplierForm.value.cnpj.length == 14) {
      fetch(`https://open.cnpja.com/office/${this.supplierForm.value.cnpj}`, {
        headers: {
          Authorization: 'Bearer 711499ff-e472-46b9-b3fe-89dfc8209092-09cac35d-e7bb-46e9-a302-c35040e49b51'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.supplierForm.patchValue({
            nome: data.company.name,
            endereco: data.address.street + ', ' + data.address.number + ', ' + data.address.city + '-' + data.address.state + ' CEP: ' + data.address.zip,
            telefone: data.phones[0].area + ' ' + data.phones[0].number
          });
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
  }
}
