import { Component, OnInit } from '@angular/core';
import { BusService, supplier } from '../../../services/bus.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private busService: BusService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.supplierForm = this.fb.group({
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
        this.router.navigate(['/home/bus/list'])
      }
    })
  }
}
