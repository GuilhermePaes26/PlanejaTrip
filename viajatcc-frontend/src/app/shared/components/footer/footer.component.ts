import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  nomeUsuario!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.nomeUsuario = this.authService.getNomeCurrentUser()
  }

}
