import { Component } from '@angular/core';
import { user, UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user!: user
  token: string | null = ''
  constructor(private userService: UserService, private authService: AuthService) {
    this.token = this.authService.getToken()
    this.userService.getUser(this.token).subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  barChartData = {
    labels: ['Janeiro', 'Fevereiro', 'Março'],
    datasets: [
      { data: [65, 59, 80], label: 'Vendas' },
      { data: [28, 48, 40], label: 'Lucros' }
    ]
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Hotel', 'Passagem', 'Passeio'],
    datasets: [
      {
        data: [1200, 500, 300],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  pieChartType: ChartType = 'pie';
}
