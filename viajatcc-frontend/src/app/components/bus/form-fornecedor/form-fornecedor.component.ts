import { Component, Inject, OnInit } from '@angular/core';
import { bus, BusService, supplier } from '../../../services/bus.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
  editMode: boolean = false

  constructor(private busService: BusService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: supplier) {
    this.supplierForm = this.fb.group({
      cnpj: [''],
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required]
    })
    if (data) {
      console.log(data);
      this.editMode = true
      this.supplierForm.patchValue({
        nome: data.nome,
        endereco: data.endereco,
        telefone: data.telefone
      });
    }
  }
  ngOnInit(): void {
    this.supplierId = this.route.snapshot.paramMap.get('id');
  }
  onsubmit(): any {
    const {nome, endereco, telefone} = this.supplierForm.value
    const onibus: bus[] = []
    const supplier: supplier = {
      nome,
      endereco,
      telefone,
      onibus
    }
    if (this.editMode) {      
      return this.busService.updateSupplier(supplier, this.data._id).subscribe({
        next: response => {
          this.dialog.closeAll()
          window.location.reload()
          this.snackBar.open('Fornecedor criado', 'fechar', {
            duration: 3000
          })
        }
      })
    }
    this.busService.createSupplier(supplier).subscribe({
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
