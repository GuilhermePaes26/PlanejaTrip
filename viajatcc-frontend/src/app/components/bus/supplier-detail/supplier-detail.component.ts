import { Component } from '@angular/core';
import { BusService, supplier } from '../../../services/bus.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateBusComponent } from '../dialog-create-bus/dialog-create-bus.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-supplier-detail',
  standalone: false,
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.scss'
})
export class SupplierDetailComponent {
  supplier!: supplier
  constructor(private busService: BusService, private route: ActivatedRoute, private dialog: MatDialog, private snackBar: MatSnackBar) {
    const id = this.route.snapshot.paramMap.get('id');
    this.busService.getSupplier(id).subscribe({
      next: (response) => {
        this.supplier = response
      }
    })
  }
  criarOnibus() {
    this.dialog.open(DialogCreateBusComponent, {data: this.supplier._id})
    console.log(this.supplier._id);
    
  }
  editarOnibus(id: string) {

  }
  async excluirOnibus(id: string) {
    const confirm = await this.dialog.open(ConfirmationDialogComponent, {
          data: 'Tem certeza que deseja excluir este ônibus?'
        }).afterClosed().toPromise()
        if (confirm) {
          this.busService.deleteBus(id).subscribe({
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
