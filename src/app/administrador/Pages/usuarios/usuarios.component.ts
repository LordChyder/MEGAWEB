import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  perfil: string;
  status: 'ACTIVE' | 'INACTIVE';
}
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

      Usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'ANDY H.',
      apellido: 'Rucoba Reategui',
      email: 'Soporte@megayuntas.com',
      perfil: 'ADMINISTRADOR',
      status: 'ACTIVE'
    },
    // …otros registros…
  ];
}
