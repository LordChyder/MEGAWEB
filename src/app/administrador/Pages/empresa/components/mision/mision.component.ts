import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-mision',
  standalone: true,
  imports: [CommonModule,FormsModule, QuillModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './mision.component.html',
  styleUrl: './mision.component.css'
})
export class MisionComponent {
    showEditor = false;
    htmlContent = '';
    guardarContenido() {
    this.showEditor = false;
    console.log('Contenido guardado:', this.htmlContent);
  }
}
