import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-administradores-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './agregar-administradores-modal.component.html',
  styleUrl: './agregar-administradores-modal.component.css'
})
export class AgregarAdministradoresModalComponent {
    @Output() cerrar = new EventEmitter<void>();
      
      // Modelo para el formulario
      administradorNuevo = {
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
      guardarAdministrador(): void {
        console.log('Cliente guardado:', this.administradorNuevo);
        // Aquí implementarías la lógica para guardar el cliente
        this.cerrarModal();
      }
    
      // Método para consultar RUC
      consultarRUC(): void {
        console.log('Consultando RUC:', this.administradorNuevo.ruc);
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
