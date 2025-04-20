import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripsService, Trip } from '../../../../services/trips.service';
import { exportPassengersToExcel } from '../../../../utils/export-to-excel';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  trip: Trip | null = null;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tripsService.getTrip(id).subscribe({
        next: (data) => {
          this.trip = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar detalhes da viagem';
          this.isLoading = false;
          console.error(err);
        },
      });
    }
  }
  generateReport() {
    if (!this.trip) return;

    exportPassengersToExcel(
      this.trip.passageiros,
      this.trip.nome,
      this.trip.preco
    );
  }
}
