import { Component } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar ADMIN/toolbar.component';
import { SidebarComponent } from '../shared/sidebar Admin/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [ToolbarComponent, SidebarComponent,RouterModule ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

}
