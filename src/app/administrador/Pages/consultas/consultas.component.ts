import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgregarConsultasComponent } from './agregar-consultas/agregar-consultas.component';
import { EditarConsultasComponent } from './editar-consultas/editar-consultas.component';
import { EliminarConsultasComponent } from './eliminar-consultas/eliminar-consultas.component';

interface Consultas {
  id: number;
  consulta: string;
  productos: string;
  modulos: string;
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
      consulta: 'ANDY H.',
      productos: 'Rucoba Reategui',
      modulos: 'Soporte@megayuntas.com'
    },

    {
      id: 2,
      consulta: 'JHON',
      productos: 'DOE',
      modulos: 'soporte@megayuntas.com' 
    },

    {
      id: 3,
      consulta: 'NIXON',
      productos: 'DOE',
      modulos: 'soporte@megayuntas.com' 
    },

    {
      id: 4,
      consulta: 'ALBERT',
      productos: 'DOE',
      modulos: 'soporte@megayuntas.com' 
    },

    {
      id: 5,
      consulta: 'JUAN',
      productos: 'DOE',
      modulos: 'soporte@megayuntas.com' 
    }
    ,
    {
      id: 6,
      consulta: 'CARLOS',
      productos: 'RAMIREZ',
      modulos: 'carlos.ramirez@megayuntas.com'
    },
    {
      id: 7,
      consulta: 'MARIA',
      productos: 'LOPEZ',
      modulos: 'maria.lopez@megayuntas.com'
    },
    {
      id: 8,
      consulta: 'PEDRO',
      productos: 'GARCIA',
      modulos: 'pedro.garcia@megayuntas.com'
    },
    {
      id: 9,
      consulta: 'LUCIA',
      productos: 'MARTINEZ',
      modulos: 'lucia.martinez@megayuntas.com'
    },
    {
      id: 10,
      consulta: 'DAVID',
      productos: 'FERNANDEZ',
      modulos: 'david.fernandez@megayuntas.com'
    },

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
