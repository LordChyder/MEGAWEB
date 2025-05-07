import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vistaproducto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vistaproducto.component.html',
  styleUrls: ['./vistaproducto.component.css']
})
export class VistaproductoComponent implements OnInit {
  nombreProducto: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.nombreProducto = this.route.snapshot.paramMap.get('nombre');
  }
}
