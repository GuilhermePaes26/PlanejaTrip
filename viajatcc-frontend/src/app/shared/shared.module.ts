import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';
import { CpfOuCnpjPipe } from './pipes/cpf-ou-cnpj.pipe';
import { StatusActiveVisitaComponent } from './components/status-active-visita/status-active-visita.component';
import { CameraComponent } from './components/camera/camera.component';

@NgModule({
  declarations: [
    SpinnerLoadingComponent,
    ErrorDialogComponent,
    HeaderComponent,
    ProgressBarComponent,
    ConfirmationDialogComponent,
    SnackbarComponent,
    FooterComponent,
    CpfOuCnpjPipe,
    StatusActiveVisitaComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [SpinnerLoadingComponent, ErrorDialogComponent, HeaderComponent, 
    ProgressBarComponent, ConfirmationDialogComponent, 
    SnackbarComponent, FooterComponent, CpfOuCnpjPipe, StatusActiveVisitaComponent,
  ]
})
export class SharedModule { }
