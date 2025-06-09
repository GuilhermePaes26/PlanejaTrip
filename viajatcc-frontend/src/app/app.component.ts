import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event,
} from '@angular/router';
import { SpinnerService } from './services/spinner.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loading = false;
  isBrowser = false;

  constructor(
    private spinner: SpinnerService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.spinner.loading$.subscribe((l) => (this.loading = l));

    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationStart) {
        this.loading = true;
      } else if (
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }
}
