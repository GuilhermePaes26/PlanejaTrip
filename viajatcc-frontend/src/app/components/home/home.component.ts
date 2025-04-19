import { Component, input } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  menu: boolean = true;
  onClick(bol: boolean) {
    this.menu = bol
  }
}
