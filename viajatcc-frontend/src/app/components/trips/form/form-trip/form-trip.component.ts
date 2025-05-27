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
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogMapsComponent } from '../dialog-maps/dialog-maps.component';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-form-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatTabGroup, MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.scss'],
})
export class FormTripComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  tripId: string | null = null;
  buses: bus[] = [];
  lat: number = 0;
  lng: number = 0;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService,
    private busService: BusService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: [0, [Validators.required, Validators.min(0)]],
      data: ['', Validators.required],
      startPoint: [{ namePoint: '', lat: 0, lng: 0 }],
      onibus: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  ngOnInit(): void {
    this.tripId = this.route.snapshot.paramMap.get('id');
    this.busService.findBus().subscribe({
      next: (response) => {
        const bus = response.filter((bus) => bus.fornecedor_id !== null);
        this.buses = bus;
      },
    });
    if (this.tripId) {
      this.isEditMode = true;

      this.tripsService.getTrip(this.tripId).subscribe((trip: any) => {
        this.form.patchValue({
          nome: trip.nome,
          descricao: trip.descricao,
          preco: trip.preco,
          data: trip.data,
          startPoint: {
            namePoint: trip.startPoint.namePoint,
            lat: trip.startPoint.lat,
            lng: trip.startPoint.lng,
          },
          onibus: trip.onibus._id,
        });
      });
    }
  }

  openMaps() {
    this.dialog
      .open(DialogMapsComponent, { width: '800px' })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log(result);
          this.form.patchValue({
            startPoint: {
              namePoint: result.namePoint,
              lat: result.result.navigation_points[0].location.latitude,
              lng: result.result.navigation_points[0].location.longitude,
            },
          });
          console.log(this.form.value.startPoint);
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    // monta multipart/form-data
    const formData = new FormData();
    const trip = this.form.value;
    formData.append('nome', trip.nome);
    formData.append('descricao', trip.descricao);
    formData.append('preco', trip.preco.toString());
    formData.append('data', trip.data);
    formData.append('onibus', trip.onibus);
    formData.append('startPoint[namePoint]', trip.startPoint.namePoint);
    formData.append('startPoint[lat]', trip.startPoint.lat.toString());
    formData.append('startPoint[lng]', trip.startPoint.lng.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditMode && this.tripId) {
      this.tripsService
        .updateTrip(this.tripId, formData)
        .subscribe(() => this.router.navigate(['/home/trips/list']));
    } else {
      this.tripsService
        .createTrip(formData)
        .subscribe(() => this.router.navigate(['/home/trips/list']));
    }
  }
}
