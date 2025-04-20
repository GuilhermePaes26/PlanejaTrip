import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { TripsComponent } from './components/trips/list/trips.component';
const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona /auth → /auth/login
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'trips', component: TripsComponent },
  {
    path: 'trips/:id',
    loadComponent: () =>
      import(
        './components/trips/details/trip-detail/trip-detail.component'
      ).then((m) => m.TripDetailComponent),
  },
  {
    path: 'trips/create',
    loadComponent: () =>
      import('./components/trips/form/form-trip/form-trip.component').then(
        (m) => m.FormTripComponent
      ),
  },
  {
    path: 'trips/edit/:id',
    loadComponent: () =>
      import('./components/trips/form/form-trip/form-trip.component').then(
        (m) => m.FormTripComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
