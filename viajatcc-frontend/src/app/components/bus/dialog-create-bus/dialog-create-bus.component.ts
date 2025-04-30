import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bus, BusService } from '../../../services/bus.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-create-bus',
  standalone: false,
  templateUrl: './dialog-create-bus.component.html',
  styleUrl: './dialog-create-bus.component.scss'
})
export class DialogCreateBusComponent {
  busForm!: FormGroup

  constructor(private busService: BusService, private fb: FormBuilder, private route: ActivatedRoute, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.busForm = this.fb.group({
      capacidade: [0, Validators.required],
      valor: [0, Validators.required]
    })
    
  }
  onSubmit() {
    const {capacidade, valor} = this.busForm.value
    const fornecedor_id = this.data
    const bus: bus = {
      capacidade,
      valor,
      fornecedor_id
    }
    this.busService.createBus(bus).subscribe({
      next: (response) => {
        this.dialog.closeAll()
        window.location.reload()
      }
    })
    
  }

}
