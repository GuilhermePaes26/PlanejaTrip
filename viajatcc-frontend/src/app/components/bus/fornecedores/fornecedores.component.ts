import { Component } from '@angular/core';
import { BusService, supplier } from '../../../services/bus.service';

@Component({
  selector: 'app-fornecedores',
  standalone: false,
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss'
})
export class FornecedoresComponent {
  suppliers: supplier[] = []
  isLoading = true;
  error = '';
  constructor(private busService: BusService ) {
    this.busService.getSuppliers().subscribe({
      next: (response) => {
        this.suppliers = response
        this.isLoading = false;
    },
      error: (err) => {
        this.error = 'Erro ao carregar os fornecedores';
        this.isLoading = false;
        console.error(err);
      }
  })
  }
  viewSupplier(id: string) {
    console.log(id);
    
  }
}
