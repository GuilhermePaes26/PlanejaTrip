import { Component, Input } from '@angular/core';
import { user } from '../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() user!: user;

  // controla se a sidebar está recolhida
  isClosed = false;

  // alterna aberto/fechado
  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}
