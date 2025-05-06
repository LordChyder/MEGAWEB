import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Producto {
  imagen: string;
  nombre: string;
  subtitulo: string;
  subtitulo2: string;
  descripcion: string;
  enlaceTexto: string;
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // API de productos (descomentar si la tienes)
    // this.http.get<Producto[]>('https://miapi.com/productos').subscribe(data => {
    //   this.productos = data;
    // });

    this.productos = [
      {
        imagen: 'assets/imagenes/scomers.png',
        nombre: 'Scomers 1',
        subtitulo: 'Software de Comercializacion',
        subtitulo2: 'Edición Empresarial',
        descripcion: 'Sistema de Facturación y Control de Inventarios, fácil, robusto, confiable, eficiente y rápido. Contamos con la mejor garantía, nuestros clientes.',
        enlaceTexto: 'Únete a nuestra red de clientes y disfruta como ellos las ventajas que brinda SCOMERS.'
      },
      {
        imagen: 'assets/imagenes/scomers.png',
        nombre: 'Scomers.CPE 2',
        subtitulo: 'Facturacion Electronica',
        subtitulo2: 'Sotfware de Facturacion',
        descripcion: 'Sistema de Facturación Electronica, fácil, robusto, confiable, eficiente y rápido. Contamos con la mejor garantía, nuestros clientes.',
        enlaceTexto: 'Únete a nuestra red de clientes y disfruta como ellos las ventajas que brinda SCOMERS.CPE'
      },
      {
        imagen: 'assets/imagenes/scomers.png',
        nombre: 'Scomers 3',
        subtitulo: 'Software de Comercializacion',
        subtitulo2: 'Edición Empresarial',
        descripcion: 'Sistema de Facturación y Control de Inventarios, fácil, robusto, confiable, eficiente y rápido. Contamos con la mejor garantía, nuestros clientes.',
        enlaceTexto: 'Únete a nuestra red de clientes y disfruta como ellos las ventajas que brinda SCOMERS.'
      },
      {
        imagen: 'assets/imagenes/scomers.png',
        nombre: 'Scomers.CPE 4',
        subtitulo: 'Facturacion Electronica',
        subtitulo2: 'Sotfware de Facturacion',
        descripcion: 'Sistema de Facturación Electronica, fácil, robusto, confiable, eficiente y rápido. Contamos con la mejor garantía, nuestros clientes.',
        enlaceTexto: 'Únete a nuestra red de clientes y disfruta como ellos las ventajas que brinda SCOMERS.CPE'
      }
    ];

    this.publicaciones = [
      {
        imagen: 'assets/img/compra.png',
        titulo: 'Ingresar Compras a Títulos Gratuitos (Costo “0.00”) 1',
        fecha: '23 de Abril del 2025 10:34 am',
        descripcion: 'En algunas ocasiones del mundo empresarial suele suceder operaciones especiales como los comprobantes con Costo Cero “0.00”.'
      },
      {
        imagen: 'assets/img/correlativo.png',
        titulo: 'Cómo corregir correlativo de series de comprobantes 2',
        fecha: '21 de Abril del 2025 08:44 am',
        descripcion: 'En esta opción se mostrará cómo corregir correlativos de comprobantes cuando sale el error de correlativo ya registrado.'
      },
      {
        imagen: 'assets/img/error.png',
        titulo: 'Tip: Corregir error al ejecutar el sistema YUPAY 3',
        fecha: '18 de Abril del 2025 11:24 am',
        descripcion: 'Procedimiento que te permitirá corregir el error cuando se ejecuta el sistema y por diferentes motivos no inicie o no aparezca nada.'
      },
      {
        imagen: 'assets/img/correlativo.png',
        titulo: 'Cómo corregir correlativo de series de comprobantes 4',
        fecha: '21 de Abril del 2025 08:44 am',
        descripcion: 'En esta opción se mostrará cómo corregir correlativos de comprobantes cuando sale el error de correlativo ya registrado.'
      },
      {
        imagen: 'assets/img/error.png',
        titulo: 'Tip: Corregir error al ejecutar el sistema YUPAY 5',
        fecha: '18 de Abril del 2025 11:24 am',
        descripcion: 'Procedimiento que te permitirá corregir el error cuando se ejecuta el sistema y por diferentes motivos no inicie o no aparezca nada.'
      }
    ];

    this.startAutoSlide();
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
