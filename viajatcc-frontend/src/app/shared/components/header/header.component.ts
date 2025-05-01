import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currentPage!: string;

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {

  }

  logout() {

    const dialog = this.openDialogConfirmation("Deseja realmente sair?")

    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result) {

          this.authService.logout()
          window.location.reload()
        }
      }
    })
  }

  openDialogConfirmation(message: string) {

    const dialogReg = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: message,
    })

    return dialogReg;
  }
}
