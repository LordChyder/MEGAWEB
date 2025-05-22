import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgregarClienteModalComponent } from './agregar-cliente-modal/agregar-cliente-modal.component';
import { EditarClienteModalComponent } from './editar-cliente-modal/editar-cliente-modal.component';
import { EliminarClienteModalComponent } from './eliminar-cliente-modal/eliminar-cliente-modal.component';

  interface Cliente {
  id: number;
  Empresa: string;
  Ruc: string;
  Telefono: string;
  Contacto: string;
  Grupo: string;
  Mostrar_en_Web : string;
  status: 'ACTIVE' | 'INACTIVE';
}
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, AgregarClienteModalComponent,
            EditarClienteModalComponent, EliminarClienteModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  clienteIdAEliminar: number | null = null

        Clientes: Cliente[] = [
    {
      id: 1,
      Empresa: 'CONSTRUCTORA INMOBILIARIA RIO HUALLAGA S.A.C',
      Ruc: '20450278051',
      Telefono: '960964632',
      Contacto: 'ADMINISTRADOR',
      Grupo: 'ADMINISTRADOR',
      Mostrar_en_Web: 'SI',
      status: 'ACTIVE'
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
  abrirModalEliminar(clienteId: number): void {
  this.clienteIdAEliminar = clienteId
  this.mostrarModalEliminar = true
  }
  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false
    this.clienteIdAEliminar = null
  }
  eliminarCliente(clienteId: number): void {
    console.log("Eliminando cliente con ID:", clienteId)
    // Aquí implementarías la lógica para eliminar el cliente
    // Por ejemplo:
    this.Clientes = this.Clientes.filter((cliente) => cliente.id !== clienteId)
    this.cerrarModalEliminar()
  }

}
