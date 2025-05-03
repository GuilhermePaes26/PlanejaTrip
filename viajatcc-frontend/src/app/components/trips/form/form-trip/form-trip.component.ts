import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripsService } from '../../../../services/trips.service';
import { bus, BusService } from '../../../../services/bus.service';

@Component({
  selector: 'app-form-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.scss'],
})
export class FormTripComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  tripId: string | null = null;
  buses: bus[] = []

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService,
    private busService: BusService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: [0, [Validators.required, Validators.min(0)]],
      data: ['', Validators.required],
      pontoDePartida: ['', Validators.required],
      onibus: ['', Validators.required],
    });
    
  }

  ngOnInit(): void {
    this.tripId = this.route.snapshot.paramMap.get('id');
    this.busService.findBus().subscribe({
      next: (response) => {
        const bus = response.filter(bus => bus.fornecedor_id !== null);
        this.buses = bus
      }
    })
    if (this.tripId) {
      this.isEditMode = true;

      this.tripsService.getTrip(this.tripId).subscribe((trip: any) => {
        this.form.patchValue({
          nome: trip.nome,
          descricao: trip.descricao,
          preco: trip.preco,
          data: trip.data,
          onibus: trip.onibus._id
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const tripData = this.form.value;

    if (this.isEditMode && this.tripId) {
      this.tripsService.updateTrip(this.tripId, tripData).subscribe(() => {
        this.router.navigate(['/home/trips/list']);
      });
    } else {
      this.tripsService.createTrip(tripData).subscribe(() => {
        this.router.navigate(['/home/trips/list']);
      });
    }
  }
}
