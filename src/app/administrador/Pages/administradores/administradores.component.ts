import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgregarAdministradoresModalComponent } from './agregar-administradores-modal/agregar-administradores-modal.component';
import { EditarAdministradoresModalComponent } from './editar-administradores-modal/editar-administradores-modal.component';
import { EliminarAdministradoresModalComponent } from './eliminar-administradores-modal/eliminar-administradores-modal.component';

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
  imports: [CommonModule,AgregarAdministradoresModalComponent,
              EditarAdministradoresModalComponent, EliminarAdministradoresModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './administradores.component.html',
})
export class AdministradoresComponent {
  mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  adminsIdAEliminar: number | null = null

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

  //FUNCION DE AGREGAR CLIENTE
  abrirModalAgregar(): void {
    this.mostrarModalAgregar = true;
  }
  cerrarModalAgregar(): void {
    this.mostrarModalAgregar = false;
  } 

  //FUNCION DE EDITAR CLIENTE
  abrirModalEditar(): void {
    this.mostrarModalEditar = true;
  }
  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
  }

  //FUNCION DE ELIMINAR CLIENTE  
  abrirModalEliminar(adminsId: number): void {
  this.adminsIdAEliminar = adminsId
  this.mostrarModalEliminar = true
  }
  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false
    this.adminsIdAEliminar = null
  }
  eliminarAdministrador(adminsId: number): void {
    console.log("Eliminando cliente con ID:", adminsId)
    this.admins = this.admins.filter((admin) => admin.id !== adminsId)
    this.cerrarModalEliminar()
  }
}
