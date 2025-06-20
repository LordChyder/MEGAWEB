import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgregarConsultasComponent } from '../consultas/agregar-consultas/agregar-consultas.component';
import { EditarConsultasComponent } from '../consultas/editar-consultas/editar-consultas.component';
import { EliminarConsultasComponent } from '../consultas/eliminar-consultas/eliminar-consultas.component';
interface Consultas {
  id: number;
  productos: string;
  descripcion: string;
  version: string;
}
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,AgregarConsultasComponent,
            EditarConsultasComponent, EliminarConsultasComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
 mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  consultaIdAEliminar: number | null = null

  consulta: Consultas[] = [
    {
      id: 1,
      productos: 'YUPAY',
      descripcion: 'La palabra YUPAY, proviene del verbo CONTAR en Quechua, este sistema nace de la necesidad de tener un producto informático de gestión contable, y que brinde el soporte y la garantía necesaria para su funcionamiento en la Region San Martin. El Software de Contabilidad YUPAY fue diseñado para satisfacer las necesidades de información contable, requeridas por SUNAT, permitiendo un ingreso rápido y eficiente de los datos, y que al mismo tiempo genere información CONFIABLE y OPORTUNA. Es un programa intuitivo que es fácil de configurar y utilizar. No se necesita entrenamiento especializado y permite trabajar rápido con una interfaz cómoda para el usuario que se ve y se siente como los programas que se utilizan diariamente. Se adapta fácilmente al manejo de su contabilidad y agiliza la generación de información contable.',
      version: '2.2.32'
    },

    {
      id: 2,
      productos: 'JHON',
      descripcion: 'DOE',
      version: '2.2.32' 
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
