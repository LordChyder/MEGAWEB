import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgregarConsultasComponent } from './agregar-consultas/agregar-consultas.component';
import { EditarConsultasComponent } from './editar-consultas/editar-consultas.component';
import { EliminarConsultasComponent } from './eliminar-consultas/eliminar-consultas.component';

interface Consultas {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  perfil: string;
  status: 'ACTIVE' | 'INACTIVE';
}
@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule,AgregarConsultasComponent,
                EditarConsultasComponent, EliminarConsultasComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent {
 mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  consultaIdAEliminar: number | null = null

  consulta: Consultas[] = [
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
  abrirModalEliminar(consultaId: number): void {
  this.consultaIdAEliminar = consultaId
  this.mostrarModalEliminar = true
  }
  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false
    this.consultaIdAEliminar = null
  }
  eliminarAdministrador(consultaId: number): void {
    console.log("Eliminando cliente con ID:", consultaId)
    this.consulta = this.consulta.filter((consultas) => consultas.id !== consultaId)
    this.cerrarModalEliminar()
  }
}
