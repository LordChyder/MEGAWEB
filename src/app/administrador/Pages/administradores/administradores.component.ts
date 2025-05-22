import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface Admin {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  perfil: string;
  status: 'ACTIVE' | 'INACTIVE';
}

@Component({
  selector: 'app-administradores',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './administradores.component.html',
})
export class AdministradoresComponent {
  admins: Admin[] = [
    {
      id: 1,
      nombre: 'ANDY H.',
      apellido: 'Rucoba Reategui',
      email: 'Soporte@megayuntas.com',
      perfil: 'ADMINISTRADOR',
      status: 'ACTIVE',

    },

    {
      id: 2,
      nombre: 'JHON',
      apellido: 'DOE',
      email: 'soporte@megayuntas.com' ,
      perfil: 'ADMINISTRADOR',
      status: 'ACTIVE',
    },

    {
      id: 3,
      nombre: 'NIXON',
      apellido: 'DOE',
      email: 'soporte@megayuntas.com' ,
      perfil: 'CREADOR DE CONTENIDO',
      status: 'ACTIVE',
    },

    {
      id: 4,
      nombre: 'ALBERT',
      apellido: 'DOE',
      email: 'soporte@megayuntas.com' ,
      perfil: 'ADMINISTRADOR',
      status: 'ACTIVE',
    },

    {
      id: 5,
      nombre: 'JUAN',
      apellido: 'DOE',
      email: 'soporte@megayuntas.com' ,
      perfil: 'ADMINISTRADOR',
      status: 'ACTIVE',
    }
    ,
    {
      id: 6,
      nombre: 'CARLOS',
      apellido: 'RAMIREZ',
      email: 'carlos.ramirez@megayuntas.com',
      perfil: 'CREADOR DE CONTENIDO',
      status: 'INACTIVE',
    },
    {
      id: 7,
      nombre: 'MARIA',
      apellido: 'LOPEZ',
      email: 'maria.lopez@megayuntas.com',
      perfil: 'ADMINISTRADOR',
      status: 'ACTIVE',
    },
    {
      id: 8,
      nombre: 'PEDRO',
      apellido: 'GARCIA',
      email: 'pedro.garcia@megayuntas.com',
      perfil: 'ADMINISTRADOR',
      status: 'INACTIVE',
    },
    {
      id: 9,
      nombre: 'LUCIA',
      apellido: 'MARTINEZ',
      email: 'lucia.martinez@megayuntas.com',
      perfil: 'CREADOR DE CONTENIDO',
      status: 'ACTIVE',
    },
    {
      id: 10,
      nombre: 'DAVID',
      apellido: 'FERNANDEZ',
      email: 'david.fernandez@megayuntas.com',
      perfil: 'ADMINISTRADOR',
      status: 'ACTIVE',
    }

    // …otros registros…
  ];
}
