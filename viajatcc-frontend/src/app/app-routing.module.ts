import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { TripsComponent } from './components/trips/list/trips.component';

import { AuthGuard } from './components/auth/auth.guard';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { TripRouterComponent } from './components/trips/trip-router/trip-router.component';
import { AlreadyLoggedGuard } from './components/auth/already-logged.guard';
import { FornecedoresComponent } from './components/bus/fornecedores/fornecedores.component';
import { UserComponent } from './components/user/user.component';
const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [AlreadyLoggedGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [AlreadyLoggedGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona /auth → /auth/login
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      {path: 'dashboard', component:DashboardComponent},
      {path: 'users', component:UserComponent},
      {
        path: 'trips', children: [
          {
            path: '',
            component: TripRouterComponent
          },
          {
            path: 'list',
            component: TripsComponent
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./components/trips/form/form-trip/form-trip.component').then(
                (m) => m.FormTripComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './components/trips/details/trip-detail/trip-detail.component'
              ).then((m) => m.TripDetailComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./components/trips/form/form-trip/form-trip.component').then(
                (m) => m.FormTripComponent
              ),
          },
        ],
      },
      {
        path: 'bus', children: [
          {
            path: '',
            component: FornecedoresComponent
          },
          {
            path: 'list',
            component: TripsComponent
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./components/trips/form/form-trip/form-trip.component').then(
                (m) => m.FormTripComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './components/trips/details/trip-detail/trip-detail.component'
              ).then((m) => m.TripDetailComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./components/trips/form/form-trip/form-trip.component').then(
                (m) => m.FormTripComponent
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
