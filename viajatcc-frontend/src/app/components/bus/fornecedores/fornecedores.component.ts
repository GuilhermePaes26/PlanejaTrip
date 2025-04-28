import { Component } from '@angular/core';
import { BusService, supplier } from '../../../services/bus.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormFornecedorComponent } from '../form-fornecedor/form-fornecedor.component';

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
  constructor(private busService: BusService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {
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
  async createSupplier() {
    this.dialog.open(FormFornecedorComponent, {width: '600px'}).afterClosed().toPromise()
  }
  async deleteSupplier(id: string) {
    const confirm = await this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir este fornecedor?'
    }).afterClosed().toPromise()
    if (confirm) {
      this.busService.deleteSupplier(id).subscribe({
        next: (response) => {
          window.location.reload()
          this.snackBar.open('Fornecedor excluido', 'fechar', {
            duration: 3000
          })
        }
      })
    }
  }
}
