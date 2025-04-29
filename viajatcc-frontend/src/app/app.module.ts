import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthComponent } from './components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { TripsComponent } from './components/trips/list/trips.component';
import { TripDetailComponent } from './components/trips/details/trip-detail/trip-detail.component';
import { FormTripComponent } from './components/trips/form/form-trip/form-trip.component';
import { SidebarComponent } from './components/home/sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { TripRouterComponent } from './components/trips/trip-router/trip-router.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FornecedoresComponent } from './components/bus/fornecedores/fornecedores.component';
import { UserComponent } from './components/user/user.component';
import { CnpjPipe } from './cnpj.pipe';
import { FormFornecedorComponent } from './components/bus/form-fornecedor/form-fornecedor.component';
import { BusRouterComponent } from './components/bus/bus-router/bus-router.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { SupplierDetailComponent } from './components/bus/supplier-detail/supplier-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AuthComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    TripRouterComponent,
    FornecedoresComponent,
    UserComponent,
    CnpjPipe,
    BusRouterComponent,
    ConfirmationDialogComponent,
    SnackbarComponent,
    SupplierDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TripsComponent,
    TripDetailComponent,
    FormTripComponent,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
