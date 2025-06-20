// src/app/components/vision/vision.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { EmpresasService, InfoInstitucional } from '../../../../../service/admin/empresa/empresas.service';


@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.css']
})
export class VisionComponent implements OnInit {
  showEditor = false;
  htmlContent = '';              // contendrá el texto de visión
  private info!: InfoInstitucional;

  constructor(private empresasSvc: EmpresasService) {}

  ngOnInit(): void {
    // Al iniciar, cargamos la visión desde la API
    this.empresasSvc.getInfoInstitucional().subscribe({
      next: info => {
        this.info = info;
        this.htmlContent = info.vision || '';
      },
      error: err => console.error('Error al cargar visión:', err)
    });
  }

  onEditar(): void {
    this.showEditor = true;
  }

  guardarContenido(): void {
    // Al guardar, enviamos solo el campo "vision"
    this.empresasSvc.actualizarInfoInstitucional({ vision: this.htmlContent })
      .subscribe({
        next: () => {
          this.showEditor = false;
          console.log('Visión actualizada:', this.htmlContent);
        },
        error: err => {
          console.error('Error al guardar visión:', err);
          alert('No se pudo actualizar la visión. Intenta de nuevo.');
        }
      });
  }
}
