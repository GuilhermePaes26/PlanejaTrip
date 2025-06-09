import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './services/auth.service';
import { first } from 'rxjs/operators';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  initialLoading = true;
  loading = false;
  isBrowser = false;

  private navSub?: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.auth.authChecked$.pipe(first()).subscribe((isAuth) => {
      this.initialLoading = false;

      this.navSub = this.router.events.subscribe((e: Event) => {
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
    });
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }
}
