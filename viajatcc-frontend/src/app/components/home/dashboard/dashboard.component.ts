import { Component } from '@angular/core';
import { user, UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { payment, PaymentsService } from '../../../services/payments.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user!: user
  meta: number = 0
  bar: number = 0
  idade01a18: user[] = []
  idade01a18Length: number = 0
  idade19a30: user[] = []
  idade31a50: user[] = []
  idade50plus: user[] = []
  token: string | null = ''
  constructor(private userService: UserService, private authService: AuthService, private payments: PaymentsService) {
    this.token = this.authService.getToken()
    this.userService.getUser(this.token).subscribe({
      next: (response) => {
        this.user = response
      }
    })
    this.payments.findAll().subscribe({
      next: (payments: payment[]) => {
        payments.forEach(payment => {

          this.meta = this.meta + payment.valor
        });
        this.bar = this.meta * 100 / 16000
        

      }
    })
    this.userService.findAll().subscribe({
      next: (users: user[]) => {
        users.forEach(user => {
          if (user.idade <= 18) {
            this.idade01a18.push(user)
          }
          else if (user.idade >= 18 && user.idade <= 30) {
            this.idade19a30.push(user)
          }
          else if (user.idade >= 31 && user.idade <= 50) {
            this.idade31a50.push(user)
          }
          else {
            this.idade50plus.push(user)
          }
           
        });
        this.idade01a18Length = this.idade01a18.length
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
      { data: [this.idade01a18Length, this.idade19a30.length, this.idade31a50.length, this.idade50plus.length], label: 'Idade dos passageiros', backgroundColor: ['#132166'] },

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
