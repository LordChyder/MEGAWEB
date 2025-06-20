// src/app/components/clientes/clientes.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarClienteModalComponent } from './agregar-cliente-modal/agregar-cliente-modal.component';
import { EditarClienteModalComponent } from './editar-cliente-modal/editar-cliente-modal.component';
import { EliminarClienteModalComponent } from './eliminar-cliente-modal/eliminar-cliente-modal.component';
import { LicenciaModalComponent, ClienteConLicencias } from './licencia-productos-modal/licencia-productos-modal.component';
import { ClientesService, Cliente } from '../../../service/admin/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    AgregarClienteModalComponent,
    EditarClienteModalComponent,
    EliminarClienteModalComponent,
    LicenciaModalComponent // Importar tu componente modal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  mostrarModalLicencias = false; // Nueva propiedad
  clienteIdAEliminar: number | null = null;

  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  clienteConLicencias: ClienteConLicencias | null = null; // Para el modal de licencias

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

  // —————————— LICENCIAS —————————— (NUEVO)
  abrirModalLicencias(cliente: Cliente): void {
    // Convertir Cliente a ClienteConLicencias y cargar licencias
    this.clienteConLicencias = {
      ...cliente,
      licencias: this.obtenerLicenciasCliente(cliente.id)
    };
    this.mostrarModalLicencias = true;
  }

  cerrarModalLicencias(): void {
    this.mostrarModalLicencias = false;
    this.clienteConLicencias = null;
  }

  guardarLicencias(cliente: ClienteConLicencias): void {
    console.log('Guardando licencias para cliente:', cliente);
    
    // Aquí harías la llamada al servicio para actualizar las licencias
    // this.clientesSvc.actualizarLicencias(cliente.id, cliente.licencias).subscribe({
    //   next: () => {
    //     console.log('Licencias actualizadas correctamente');
    //     this.cargarClientes();
    //   },
    //   error: (err) => console.error('Error al actualizar licencias', err)
    // });
    
    this.cerrarModalLicencias();
  }

  // Método para obtener licencias del cliente (simulado)
  private obtenerLicenciasCliente(clienteId: number) {
    // Aquí harías la llamada real al servicio para obtener las licencias
    // return this.clientesSvc.getLicenciasCliente(clienteId);
    
    // Por ahora, datos de ejemplo basados en el clienteId
    const licenciasEjemplo = [
      {
        sistema: 'YUPAY',
        fechInstalacion: '01/04/2025',
        fechActualizacion: '24/03/2025',
        version: '2.2.32',
        usuarioLic: 5,
        nroSerieLicencia: `BRWN-BP3Y-C5NF-KXYF-4TGK-6C5B-${clienteId}`,
        status: 'Vigente',
        licActiva: 'Activa'
      },
      {
        sistema: 'CONTABILIDAD',
        fechInstalacion: '15/03/2025',
        fechActualizacion: '20/03/2025',
        version: '3.1.5',
        usuarioLic: 3,
        nroSerieLicencia: `CONT-XY2Z-A1B2-C3D4-E5F6-${clienteId}`,
        status: 'Vigente',
        licActiva: 'Activa'
      }
    ];

    return licenciasEjemplo;
  }
}