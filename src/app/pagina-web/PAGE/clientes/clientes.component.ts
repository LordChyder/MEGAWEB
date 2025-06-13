import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../service/pages/clientes/clientes.service';
import { VistaclienteService } from '../../../service/pages/vistacliente/vistacliente.service';
import { Inject } from '@angular/core';

export interface Cliente {
  idcliente: number;
  nombreCliente: string;
  imagenCliente: string;
}

export interface VistaClienteProducto {
  idcliente: number;
  nombreCliente: string;
  nombreProducto: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  mostrarModal = false;
  clienteSeleccionado: Cliente | null = null;

  clientes: Cliente[] = [];
  productosCliente: string[] = [];

  paginaActual: number = 0;
  clientesPorPagina: number = 4;
  constructor(
    private clientesService: ClientesService,
    @Inject(VistaclienteService) private vistaclienteService: VistaclienteService
  ) {}

  ngOnInit(): void {
    this.clientesService.obtenerClientes().subscribe({
      next: (datos) => {
        this.clientes = datos;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
      }
    });
  }

  // Modal
  abrirModal(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.mostrarModal = true;
    this.productosCliente = [];

    this.vistaclienteService.obtenerProductosCliente(cliente.id).subscribe({
    next: (datos: VistaClienteProducto[]) => {
    if (datos.length > 0) {
      this.productosCliente = datos.map(p => p.nombreProducto);
      this.clienteSeleccionado = {
        ...cliente,
        nombreCliente: datos[0].nombreCliente || cliente.nombreCliente
      };
    } else {
      console.warn('Este cliente no tiene productos registrados.');
    }
    },
    error: (err) => {
      console.error('Error al cargar productos del cliente:', err);
    }
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.clienteSeleccionado = null;
    this.productosCliente = [];
  }

  // Paginación
  get totalPaginas(): number {
    return Math.ceil(this.clientes.length / this.clientesPorPagina);
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }

  get clientesPaginados(): Cliente[] {
    const inicio = this.paginaActual * this.clientesPorPagina;
    return this.clientes.slice(inicio, inicio + this.clientesPorPagina);
  }
}
