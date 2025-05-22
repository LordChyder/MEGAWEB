import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vistaconsulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vistaconsulta.component.html',
  styleUrl: './vistaconsulta.component.css'
})
export class VistaconsultaComponent implements OnInit {
  titulo: string = 'Ingresar Compras a Título Gratuito (Costo "0.00")';
  consulta: any;
  busquedasRecientes: string[] = [];
  comentario: string = '';
  mostrarTodosLosPasos: boolean = false;

  // 🟡 Lista de comentarios visibles en la interfaz
  comentarios: { nombre: string; fecha: string; texto: string }[] = [];

  ngOnInit(): void {
    this.consulta = {
      titulo: this.titulo,
      fuente: 'YUPAY',
      categoria: 'Contabilidad',
      descripcion:
        'En algunas ocasiones del mundo empresarial suele suceder operaciones especiales, como lo es Comprobantes con Costo Cero "0.00"',
      pasos: [
        {
          titulo: '1.- Ir a la Opción Contabilidad/Documentos – Nuevo Documento',
          imagen: 'assets/img/ejemplo1.png',
          detalles: [
            'Click en Nuevo Documento / Llenamos los datos de Cabecera.',
            'Cambiamos el Modo de Registro: Manual <span class="text-red-500">(Como se ve en la Imagen)</span>.'
          ]
        },
        {
          titulo: '2.- Ingresar las Cuentas del DEBE y el HABER de Forma Manual',
          imagen: 'assets/img/ejemplo2.png',
          detalles: [
            'De esta forma es posible Ingresar Montos en Cero "0.00", como se puede ver en el Asiento Contable.',
            'Click o F9, para <span class="text-pink-600">Guardar los Cambios</span>.'
          ]
        },
        {
          titulo: '3.- Paso adicional de prueba',
          imagen: 'assets/img/ejemplo3.png',
          detalles: [
            'Este paso es solo un ejemplo para ilustrar el "Ver más..."'
          ]
        }
      ]
    };

    this.busquedasRecientes = [
      'Gestión de Registros Contables - YUPAY',
      'Tip: Validación de Comprobantes Electrónicos - YUPAY',
      'Tip: Exportar TXT de Balance de Comprobación - YUPAY',
      'Tip: Cómo registrar una Factura de Compra de Mercadería (Selva) - YUPAY',
      'Tip: Cómo registrar una Factura de Compra de Mercadería (Costa) - YUPAY'
    ];

    // 🟢 Comentarios predeterminados
    this.comentarios = [
      {
        nombre: 'Andy H. Rucoba Reategui',
        fecha: '13 de Abril del 2025 11:21am',
        texto: 'Excelente sistema desde que lo adquirí mi empresa ha empezado a destacar...'
      },
      {
        nombre: 'Yder C. Yalico',
        fecha: '10 de Abril del 2025 03:27pm',
        texto: 'Este sistema ha impulsado a mi empresa como nunca...'
      },
      {
        nombre: 'Nixon H. Fernandez',
        fecha: '07 de Marzo del 2025 07:45am',
        texto: 'El sistema Yupai es muy práctico, agradezco a esta empresa...'
      }
    ];
  }

  comentar(): void {
    const texto = this.comentario.trim();
    if (texto) {
      const nuevoComentario = {
        nombre: 'Tú',
        fecha: new Date().toLocaleString(),
        texto
      };
      this.comentarios.unshift(nuevoComentario); // Agrega al inicio
      this.comentario = ''; // Limpia el campo
    }
  }

  verMasPasos(): void {
    this.mostrarTodosLosPasos = true;
  }
}