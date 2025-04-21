import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TripsService, Trip } from '../../../services/trips.service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;
  error = '';

  constructor(private tripsService: TripsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTrips();
  }

  fetchTrips(): void {
    this.tripsService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar as viagens';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/trips', id]);
  }

  editTrip(id: string): void {
    this.router.navigate(['/trips/edit', id]);
  }

  deleteTrip(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta viagem?')) {
      this.tripsService.deleteTrip(id).subscribe({
        next: () => this.fetchTrips(),
        error: (err) => console.error('Erro ao excluir', err),
      });
    }
  }
}
