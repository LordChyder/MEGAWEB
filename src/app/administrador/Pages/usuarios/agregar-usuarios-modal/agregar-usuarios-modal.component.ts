import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuarios-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './agregar-usuarios-modal.component.html',
  styleUrl: './agregar-usuarios-modal.component.css'
})
export class AgregarUsuariosModalComponent {
  @Output() cerrar = new EventEmitter<void>();
  
  usuarioNuevo = {
    nombre: '',
    apellido: '',
    email: '',
    perfil: '',
    status: 'ACTIVE'
  };

  cerrarModal(): void {
    this.cerrar.emit();
  }

  guardarUsuario(): void {
    console.log('Usuario guardado:', this.usuarioNuevo);
    // Aquí implementarías la lógica para guardar el usuario
    this.cerrarModal();
  }
}
