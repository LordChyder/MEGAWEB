import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarEmpresaComponent } from '../../../shared/sidebar-empresa/sidebar-empresa.component';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule,RouterModule,SidebarEmpresaComponent],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {

}
