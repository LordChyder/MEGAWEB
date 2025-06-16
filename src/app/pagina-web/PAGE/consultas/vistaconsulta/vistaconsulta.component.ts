import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VistaconsultaService } from '../../../../service/pages/vistaconsulta/vistaconsulta.service';

export interface Paso {
  tituloPaso: string;
  imagenPaso: string;
  descripcionPaso: string; // HTML
}

export interface ConsultaDetalle {
  tituloConsulta: string;
  nombreProducto: string;
  descripcionConsulta: string;
  pasos: Paso[];
}

@Component({
  selector: 'app-vistaconsulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vistaconsulta.component.html',
  styleUrl: './vistaconsulta.component.css'
})
export class VistaconsultaComponent implements OnInit {
  consulta!: ConsultaDetalle;
  busquedasRecientes: string[] = [];
  comentario: string = '';
  mostrarTodosLosPasos: boolean = false;
  error: string = '';

  comentarios: { nombre: string; fecha: string; texto: string }[] = [];

  constructor(
    private vistaconsultaService: VistaconsultaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.vistaconsultaService.obtenerConsulta(id).subscribe({
        next: (data) => {
          this.consulta = data;
        },
        error: () => {
          this.error = 'No se pudo cargar la consulta. Verifica tu conexión.';
        }
      });
    } else {
      this.error = 'ID de consulta inválido.';
    }

    this.busquedasRecientes = [
      'Gestión de Registros Contables - YUPAY',
      'Tip: Validación de Comprobantes Electrónicos - YUPAY',
      'Tip: Exportar TXT de Balance de Comprobación - YUPAY',
      'Tip: Cómo registrar una Factura de Compra de Mercadería (Selva) - YUPAY',
      'Tip: Cómo registrar una Factura de Compra de Mercadería (Costa) - YUPAY'
    ];

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
        nombre: 'Harold S. López',
        fecha: '10 de Abril del 2025 03:20pm',
        texto: 'Este sistema ha impulsado a mi empresa como nunca...'
      },
      {
        nombre: 'Yder C. Yalico',
        fecha: '09 de Abril del 2025 05:27pm',
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
      this.comentarios.unshift(nuevoComentario);
      this.comentario = '';
    }
  }

  verMasPasos(): void {
    this.mostrarTodosLosPasos = true;
  }
}
