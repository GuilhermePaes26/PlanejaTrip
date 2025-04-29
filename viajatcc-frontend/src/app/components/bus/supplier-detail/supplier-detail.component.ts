import { Component } from '@angular/core';
import { BusService, supplier } from '../../../services/bus.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier-detail',
  standalone: false,
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.scss'
})
export class SupplierDetailComponent {
  supplier!: supplier
  constructor(private busService: BusService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.busService.getSupplier(id).subscribe({
      next: (response) => {
        this.supplier = response
      }
    })
  }
}
