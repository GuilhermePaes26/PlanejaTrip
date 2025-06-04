import { Component, OnInit, ViewChild } from '@angular/core';
import { user, UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { payment, PaymentsService } from '../../../services/payments.service';
import { BaseChartDirective } from 'ng2-charts';
import { Trip, TripsService } from '../../../services/trips.service';
import { bus, BusService } from '../../../services/bus.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user!: user

  // dados da meta
  meta: number = 0
  bar: number = 0

  // dados ultimas viagens
  top5Trips: Trip[] = []
  trips: Trip[] = [];
  disabledTrips: Trip[] = []

  // dados grafico de idade
  idade01a18: user[] = []
  idade19a30: user[] = []
  idade31a50: user[] = []
  idade50plus: user[] = []
  barChartDataIdade: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  //dados grafico pizza p. lucros
  valorOnibus: number = 0
  valorVendas: number = 0
  valorLucro: number = 0
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  token: string | null = ''
  ngOnInit(): void {
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
        this.barChartDataIdade = {
          labels: ['01 a 18', '19 a 30', '31 a 50', '50+'],
          datasets: [
            {
              data: [this.idade01a18.length, this.idade19a30.length, this.idade31a50.length, this.idade50plus.length],
              label: 'Idade dos passageiros',
              backgroundColor: ['#132166']
            },

          ]
        };
      }
    })
    this.fetchTrips();
    this.chartPieCalc()

  }
  fetchTrips(): void {
    this.tripsService.getTrips().subscribe({
      next: (data: Trip[]) => {

        this.top5Trips.push(data[(data.length - 5)], data[data.length - 4], data[data.length - 3], data[data.length - 2], data[data.length - 1])

        const hoje = new Date()
        this.top5Trips.forEach(trip => {
          const dataTrip = new Date(trip.data)
          if (dataTrip < hoje) {


            this.disabledTrips.push(trip)
          } else {
            this.trips.push(trip)
          }


        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  constructor(private userService: UserService,
    private authService: AuthService,
    private payments: PaymentsService,
    private tripsService: TripsService,
    private busService: BusService,) {
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


  // pieChartData: ChartConfiguration<'pie'>['data'] = {
  //   labels: ['Vendas', 'ônibus', 'Lucro'],
  //   datasets: [
  //     {
  //       data: [1200, 500, 300],
  //       backgroundColor: ['#132166', '#233DFF', '#4a289e']
  //     }
  //   ]
  // };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  pieChartType: ChartType = 'pie';

  close(id: string) {
    document.getElementById(id)?.classList.toggle('d-none')
  }

  async chartPieCalc() {
    await this.busService.findBus().subscribe({
      next: (buses: bus[]) => {
        buses.forEach(bus => {

          this.valorOnibus = this.valorOnibus + bus.valor
          console.log(this.valorOnibus);

        })
      }
    })
    this.payments.findAll().subscribe({
      next: (payments) => {
        payments.forEach(payment => {

          this.valorVendas = this.valorVendas + payment.valor
        });
        this.valorLucro = this.valorVendas - this.valorOnibus
        console.log(this.valorLucro);

        this.pieChartData = {
        labels: ['Vendas', 'ônibus', 'Lucro'],
        datasets: [
          {
            data: [this.valorVendas, this.valorOnibus, this.valorLucro],
            backgroundColor: ['#132166', '#233DFF', '#4a289e']
          }
        ]
      };
      },
  })


}
}
