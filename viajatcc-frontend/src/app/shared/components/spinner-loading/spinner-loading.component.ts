import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.scss']
})
export class SpinnerLoadingComponent implements OnInit {

  @Input() diameter!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
