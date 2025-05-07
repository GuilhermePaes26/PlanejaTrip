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
      { data: [65, 59, 80], label: 'Vendas', backgroundColor: ['#132166'] },
      { data: [28, 48, 40], label: 'Lucros', backgroundColor: ['#233DFF'] },
      
    ]
  };
  barChartDataIdade = {
    labels: ['01 a 18', '19 a 30', '31 a 50', '50+'],
    datasets: [
      { data: [65, 88 , 59, 80], label: 'Idade dos passageiros', backgroundColor: ['#132166'] },
      
    ]
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Hotel', 'Passagem', 'Passeio'],
    datasets: [
      {
        data: [1200, 500, 300],
        backgroundColor: ['#132166', '#233DFF', '#4a289e']
      }
    ]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  pieChartType: ChartType = 'pie';
}
