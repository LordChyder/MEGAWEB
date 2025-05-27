import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductoService, PublicacionesService } from '../../../service/pages/inicio.service';
import { OnDestroy } from '@angular/core';

interface Producto {
  id: string;
  imagen: string;
  nombre: string;
  descripcion: string;
}

interface Publicacion {
  imagen: string;
  titulo: string;
  fecha: string;
  descripcion: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  currentSlide = 0;
  productos: Producto[] = [];
  publicaciones: Publicacion[] = [];
  intervalId: any;

  constructor(
    private productoService: ProductoService,
    private publicacionesService: PublicacionesService
  ) {}

  ngOnInit(): void {
    this.getProducto();
    this.getPublicacion();
    this.startAutoSlide();
  }

  getProducto(){
    this.productoService.getProducto().subscribe({
      next: (result) => {
        this.productos = result.productos;
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);
      }
    });
  }

  getPublicacion(){
    this.publicacionesService.getPublicacion().subscribe({
      next: (result)=> {
        console.log(result)
        this.publicaciones = result.publicaciones;
      },
      error: (error)=> {
        console.error('Error al obtener las publicaciones', error);
      }
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 segundos
  }

  updateCarousel() {
    const offset = -this.currentSlide * 100;
    if (this.carousel) {
      this.carousel.nativeElement.style.transform = `translateX(${offset}%)`;
    }
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.productos.length) % this.productos.length;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.productos.length;
    this.updateCarousel();
  }
}
