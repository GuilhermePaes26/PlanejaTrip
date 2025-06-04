import { Component, OnInit, ViewChild } from '@angular/core';
import { user, UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { payment, PaymentsService } from '../../../services/payments.service';
import { BaseChartDirective } from 'ng2-charts';
import { Trip, TripsService } from '../../../services/trips.service';
import { bus, BusService } from '../../../services/bus.service';
import { getMounthString } from '../../../utils/getMeses';

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

  //dados grafico viagens proximos meses
  viagemPorData: any = {}
  mesUm: any = ''
  mesDois: string = ''
  mesTres: string = ''
  meses: any = []
  barChartData: ChartConfiguration<'bar'>['data'] = {
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
    this.chartBarTripsForMounth()
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
        this.bar = this.meta * 100 / 35000


      }
    })
  }
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  // barChartData = {
  //   labels: ['Janeiro', 'Fevereiro', 'Março'],
  //   datasets: [
  //     { data: [28, 48, 40], label: 'Lucros', backgroundColor: ['#233DFF'] },

  //   ]
  // };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  pieChartType: ChartType = 'pie';

  close(id: string) {
    document.getElementById(id)?.classList.toggle('d-none')
    document.getElementById(id + 'volta')?.classList.toggle('d-none')
    document.getElementById('buttonsVolta')?.classList.remove('d-none')
  }

  async chartPieCalc() {
    await this.busService.findBus().subscribe({
      next: (buses: bus[]) => {
        buses.forEach(bus => {

          this.valorOnibus = this.valorOnibus + bus.valor

        })
      }
    })
    this.payments.findAll().subscribe({
      next: (payments) => {
        payments.forEach(payment => {

          this.valorVendas = this.valorVendas + payment.valor
        });
        this.valorLucro = this.valorVendas - this.valorOnibus

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

  async chartBarTripsForMounth() {
    await this.tripsService.getTrips().subscribe({
      next: (trips) => {
        const hoje = new Date();
        const tresMesesDepois = new Date();
        tresMesesDepois.setMonth(hoje.getMonth() + 3);

        const proximasViagens = trips.filter(trip => {
          const data = new Date(trip.data);
          return data >= hoje && data <= tresMesesDepois;
        });

        const listMeses: any[] = [] // getMonth vai de 0 (Jan) a 11 (Dez)
        this.viagemPorData = proximasViagens.reduce((acc, trip) => {
          const data = new Date(trip.data);
          const mes = data.getMonth() + 1;
          const nomeMes: any = getMounthString(mes);
          listMeses.push(mes)


          if (!acc[nomeMes]) {
            acc[nomeMes] = 1;
          } else {
            acc[nomeMes]++;
          }

          return acc;
        }, {} as Record<number, number>);
        const sortMeses = listMeses.sort()
        this.meses = new Set(sortMeses); // remove duplicados
        const mesesArray: any = Array.from(this.meses); // converte para array
        this.mesUm = getMounthString(mesesArray[0]);
        this.mesDois = getMounthString(mesesArray[1]);
        this.mesTres = getMounthString(mesesArray[2]);

        const dadosMesesArray: any = Object.values(this.viagemPorData)

        this.barChartData = {
          labels: [this.mesUm, this.mesDois, this.mesTres],
          datasets: [
            { data: [dadosMesesArray[2], dadosMesesArray[0], dadosMesesArray[1]], label: 'Viagens planejadas', backgroundColor: ['#233DFF'] },

          ]
        };
      },
    })
  }
}
