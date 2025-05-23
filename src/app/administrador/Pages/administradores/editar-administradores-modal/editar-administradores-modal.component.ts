import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-administradores-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './editar-administradores-modal.component.html',
  styleUrl: './editar-administradores-modal.component.css'
})
export class EditarAdministradoresModalComponent {
  @Output() cerrar = new EventEmitter<void>();
  
  // Modelo para el formulario
  administrador = {
    empresa: '',
    opinion: '',
    ruc: '',
    telefono: '',
    contacto: '',
    direccion: '',
    localidad: '',
    nombreComercial: '',
    grupo: '',
    mostrarWeb: false
  };

  // Método para cerrar el modal
  cerrarModal(): void {
    this.cerrar.emit();
  }

  // Método para guardar el cliente
  guardarCliente(): void {
    console.log('Cliente guardado:', this.administrador);
    // Aquí implementarías la lógica para guardar el cliente
    this.cerrarModal();
  }

  // Método para consultar RUC
  consultarRUC(): void {
    console.log('Consultando RUC:', this.administrador.ruc);
    // Implementar lógica para consultar RUC
  }

  // Método para subir imagen
  subirImagen(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('Imagen seleccionada:', input.files[0].name);
      // Implementar lógica para procesar la imagen
    }
  }
}
