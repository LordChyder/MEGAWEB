import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-eliminar-usuarios-modal',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './eliminar-usuarios-modal.component.html',
  styleUrl: './eliminar-usuarios-modal.component.css'
})
export class EliminarUsuariosModalComponent {
  @Input() usuarioId: number | null = null;
  @Output() confirmar = new EventEmitter<number>();
  @Output() cancelar = new EventEmitter<void>();

  confirmarEliminacion(): void {
    if (this.usuarioId !== null) {
      this.confirmar.emit(this.usuarioId);
    }
  }

  cancelarEliminacion(): void {
    this.cancelar.emit();
  }
}
