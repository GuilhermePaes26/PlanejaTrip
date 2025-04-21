import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authChecked = false;
  isBrowser = false;
  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.authService.authChecked$.subscribe(checked => {
      this.authChecked = checked;
    });
  }
  title = 'PlanejaTrip';
}
