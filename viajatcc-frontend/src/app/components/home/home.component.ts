import { Component, input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  home: boolean = false
  trips: boolean = false
  menu: boolean = true;
  onClick(bol: boolean) {
    this.menu = bol
  }

  constructor(private router: Router) {
  }
}
