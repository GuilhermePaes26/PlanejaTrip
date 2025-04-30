import { Component } from '@angular/core';
import { BusService, supplier } from '../../../services/bus.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateBusComponent } from '../dialog-create-bus/dialog-create-bus.component';

@Component({
  selector: 'app-supplier-detail',
  standalone: false,
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.scss'
})
export class SupplierDetailComponent {
  supplier!: supplier
  constructor(private busService: BusService, private route: ActivatedRoute, private dialog: MatDialog) {
    const id = this.route.snapshot.paramMap.get('id');
    this.busService.getSupplier(id).subscribe({
      next: (response) => {
        this.supplier = response
      }
    })
  }
  criarOnibus() {
    this.dialog.open(DialogCreateBusComponent, {data: this.supplier._id})
  }
  editarOnibus(id: string) {

  }
  excluirOnibus(id: string) {

  }
}
