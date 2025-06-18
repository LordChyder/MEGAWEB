import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ Importar Router
import { ProductoService } from '../../../service/pages/productos/productos.service';
import { PublicacionesService } from '../../../service/pages/publicaciones/publicaciones.service';
import { NosotrosService } from '../../../service/pages/nosotros/nosotros.service';

interface Producto {
  id: string | number;
  imagen: string;
  nombre: string;
  descripcion: string;
}

interface Publicacion {
  id: string | number;
  imagen: string;
  titulo: string;
  fecha: string;
  descripcion: string;
}

interface Nosotros {
  descripcion: string;
  mision: string;
  vision: string;
  telefono: string;
  direccion: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit, OnDestroy {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  currentSlide = 0;
  productos: Producto[] = [];
  publicaciones: Publicacion[] = [];
  descripcionEmpresa: string = '';
  intervalId: any;
  nosotros: any;
consultas: any;

  constructor(
    private productoService: ProductoService,
    private publicacionesService: PublicacionesService,
    private nosotrosService: NosotrosService,
    private router: Router // ✅ Inyectar Router
  ) {}

  ngOnInit(): void {
    this.getProducto();
    this.getPublicacion();
    this.getNosotros();
  }

  getProducto() {
    this.productoService.getProducto().subscribe({
      next: (result) => {
        if (result && Array.isArray(result)) {
          this.productos = result;
          if (this.productos.length > 0) {
            this.startAutoSlide();
          }
        } else {
          console.error('No se recibieron productos o respuesta inválida:', result);
          this.productos = [];
        }
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);
      }
    });
  }

  getPublicacion() {
    this.publicacionesService.getPublicacion().subscribe({
      next: (result) => {
        if (result && Array.isArray(result)) {
          this.publicaciones = result;
        } else {
          console.error('Respuesta inesperada de publicaciones:', result);
        }
      },
      error: (error) => {
        console.error('Error al obtener las publicaciones', error);
      }
    });
  }

  getNosotros() {
    this.nosotrosService.getNosotros().subscribe({
      next: (result) => {
        if (result && result.descripcion) {
          this.descripcionEmpresa = result.descripcion;
        } else {
          console.error('Respuesta inesperada de nosotros:', result);
        }
      },
      error: (error) => {
        console.error('Error al obtener nosotros:', error);
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  updateCarousel() {
    const offset = -this.currentSlide * 100;
    if (this.carousel?.nativeElement) {
      this.carousel.nativeElement.style.transform = `translateX(${offset}%)`;
    }
  }

  prevSlide() {
    if (this.productos.length === 0) return;
    this.currentSlide = (this.currentSlide - 1 + this.productos.length) % this.productos.length;
    this.updateCarousel();
  }

  nextSlide() {
    if (this.productos.length === 0) return;
    this.currentSlide = (this.currentSlide + 1) % this.productos.length;
    this.updateCarousel();
  }

  // ✅ Método para redirigir a la consulta
  irAConsulta(id: number | string) {
    this.router.navigate(['/consultas', id]);
  }
}
