import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface Producto {
  imagen: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  productos: Producto[] = [];
  productosPorBloque: Producto[][] = [];
  currentSlide: number = 0;

  constructor(private http: HttpClient) {}


  //Diseño sin API
  ngOnInit(): void {
    this.productos = [
      {
        imagen: 'assets/imagenes/yupay.png',
        nombre: 'Yupay',
        subtitulo: 'Software de Contabilidad',
        descripcion: 'Sistema de fácil adaptabilidad al manejo de contabilidad y agiliza la generación de información.',
      },
      {
        imagen: 'assets/imagenes/scomers.png',
        nombre: 'Scomers',
        subtitulo: 'Edición Empresarial',
        descripcion: 'Sistema de Facturación y Control de inventarios, fácil, robusto, confiable, eficiente y rápido.',
      },
      {
        imagen: 'assets/imagenes/scomers-cpe.png',
        nombre: 'Scomers.CPE',
        subtitulo: 'Módulo de Facturación Electrónica',
        descripcion: 'Gestión de Comprobantes de Pago Electrónico, Emisión Web y más.',
      },
      {
        imagen: 'assets/imagenes/scomers-movil.png',
        nombre: 'Scomers.Movil',
        subtitulo: 'Plataforma Móvil',
        descripcion: 'Aplicación móvil para facturación, venta y toma de pedidos con dispositivos móviles.',
      },
      {
        imagen: 'assets/imagenes/yupay.png',
        nombre: 'Yupay2',
        subtitulo: 'Software de Contabilidad',
        descripcion: 'Sistema de fácil adaptabilidad al manejo de contabilidad y agiliza la generación de información.',
      },
      {
        imagen: 'assets/imagenes/scomers.png',
        nombre: 'Scomers2',
        subtitulo: 'Edición Empresarial',
        descripcion: 'Sistema de Facturación y Control de inventarios, fácil, robusto, confiable, eficiente y rápido.',
      },
      {
        imagen: 'assets/imagenes/scomers-cpe.png',
        nombre: 'Scomers.CPE2',
        subtitulo: 'Módulo de Facturación Electrónica',
        descripcion: 'Gestión de Comprobantes de Pago Electrónico, Emisión Web y más.',
      },
      {
        imagen: 'assets/imagenes/scomers-movil.png',
        nombre: 'Scomers.Movil2',
        subtitulo: 'Plataforma Móvil',
        descripcion: 'Aplicación móvil para facturación, venta y toma de pedidos con dispositivos móviles.',
      }
    ];

    this.generarBloques();
    this.updateCarousel();
  }

  generarBloques(): void {
    const tamanoBloque = 4;
    this.productosPorBloque = [];
    for (let i = 0; i < this.productos.length; i += tamanoBloque) {
      this.productosPorBloque.push(this.productos.slice(i, i + tamanoBloque));
    }
  }

  updateCarousel() {
    const offset = -this.currentSlide * 100;
    if (this.carousel) {
      this.carousel.nativeElement.style.transform = `translateX(${offset}%)`;
    }
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.productosPorBloque.length) % this.productosPorBloque.length;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.productosPorBloque.length;
    this.updateCarousel();
  }
}
