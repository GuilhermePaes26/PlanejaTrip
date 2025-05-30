import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TripsService, Trip } from '../../../services/trips.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBar],
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];
  disabledTrips: Trip[] = []
  isLoading = true;
  error = '';

  constructor(private tripsService: TripsService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchTrips();
  }

  fetchTrips(): void {
    this.tripsService.getTrips().subscribe({
      next: (data: Trip[]) => {
        const hoje = new Date()
        data.forEach(trip => {
          const dataTrip = new Date(trip.data)
          if (dataTrip < hoje) {
            this.disabledTrips.push(trip)
          } else {
            this.trips.push(trip)
          }
          
          
        });
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
    console.log(id);
    
    this.router.navigate([`/home/trips/${id}`]);
  }

  editTrip(id: string): void {
    this.router.navigate(['/home/trips/edit', id]);
  }

  async deleteTrip(id: string) {
    const confirm = await this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir esta viagem? O dinheiro dos passageiros será estornado!'
    }).afterClosed().toPromise()
    if (confirm) {
      this.tripsService.deleteTrip(id).subscribe({
        next: () => this.fetchTrips(),
        error: (err) => console.error('Erro ao excluir', err),
      });
    }
  }
}
