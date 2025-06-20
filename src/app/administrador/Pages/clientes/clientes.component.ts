// src/app/components/clientes/clientes.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarClienteModalComponent } from './agregar-cliente-modal/agregar-cliente-modal.component';
import { EditarClienteModalComponent } from './editar-cliente-modal/editar-cliente-modal.component';
import { EliminarClienteModalComponent } from './eliminar-cliente-modal/eliminar-cliente-modal.component';
import { ClientesService, Cliente } from '../../../service/admin/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    AgregarClienteModalComponent,
    EditarClienteModalComponent,
    EliminarClienteModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  clienteIdAEliminar: number | null = null;

  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;

  constructor(private clientesSvc: ClientesService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  // Público para que pueda llamarse desde los modales
  cargarClientes(): void {
    this.clientesSvc.getClientes().subscribe({
      next: data => this.clientes = data,
      error: err => console.error('Error al cargar clientes', err)
    });
  }

  // —————————— AGREGAR ——————————
  abrirModalAgregar(): void {
    this.mostrarModalAgregar = true;
  }
  cerrarModalAgregar(): void {
    this.mostrarModalAgregar = false;
    this.cargarClientes();
  }

  // —————————— EDITAR ——————————
  abrirModalEditar(cliente: Cliente): void {
    this.clienteSeleccionado = { ...cliente };
    this.mostrarModalEditar = true;
  }
  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
    this.clienteSeleccionado = null;
    this.cargarClientes();
  }

  // —————————— ELIMINAR ——————————
  abrirModalEliminar(clienteId: number): void {
    this.clienteIdAEliminar = clienteId;
    this.mostrarModalEliminar = true;
  }
  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.clienteIdAEliminar = null;
  }
  eliminarCliente(clienteId: number): void {
    this.clientes = this.clientes.filter(c => c.id !== clienteId);
    this.cerrarModalEliminar();
  }
}
