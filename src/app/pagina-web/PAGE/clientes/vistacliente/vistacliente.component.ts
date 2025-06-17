import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ClienteProducto {
  idcliente: number;
  nombreCliente: string;
  nombreProducto: string;
}

@Component({
  selector: 'app-vistacliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vistacliente.component.html',
  styleUrls: ['./vistacliente.component.css'] // ✅ corregido
})
export class VistaclienteComponent implements OnChanges {
  @Input() nombreCliente: string = '';
  @Input() productosCliente: ClienteProducto[] = [];

  @Output() cerrar = new EventEmitter<void>();

  productos: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productosCliente'] && this.productosCliente?.length > 0) {
      this.productos = this.productosCliente.map(p => p.nombreProducto);
    } else {
      this.productos = [];
    }
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}
