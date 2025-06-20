import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-usuarios-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './editar-usuarios-modal.component.html',
  styleUrl: './editar-usuarios-modal.component.css'
})
export class EditarUsuariosModalComponent {
  @Output() cerrar = new EventEmitter<void>();
  
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    perfil: '',
    password: '',
  };

  confirmPassword = '';

  cerrarModal(): void {
    this.cerrar.emit();
  }

  guardarUsuario(): void {
    console.log('Usuario guardado:', this.usuario);
    // Aquí implementarías la lógica para guardar el usuario
    this.cerrarModal();
  }
}
