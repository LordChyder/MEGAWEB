import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-eliminar-administradores-modal',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './eliminar-administradores-modal.component.html',
  styleUrl: './eliminar-administradores-modal.component.css'
})
export class EliminarAdministradoresModalComponent {
  @Input() adminsId: number | null = null
  @Output() confirmar = new EventEmitter<number>()
  @Output() cancelar = new EventEmitter<void>()

  // Método para confirmar la eliminación
  confirmarEliminacion(): void {
    if (this.adminsId !== null) {
      this.confirmar.emit(this.adminsId)
    }
  }

  // Método para cancelar la eliminación
  cancelarEliminacion(): void {
    this.cancelar.emit()
  }
}
