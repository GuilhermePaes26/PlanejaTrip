import { Component, Input } from '@angular/core';
import { user } from '../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() user!: user
}
