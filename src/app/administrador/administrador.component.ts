import { Component } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar ADMIN/toolbar.component';
import { SidebarComponent } from '../shared/sidebar Admin/sidebar.component';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [ToolbarComponent, SidebarComponent ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

}
