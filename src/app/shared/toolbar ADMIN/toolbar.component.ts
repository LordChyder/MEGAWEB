import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  providers: [JwtHelperService] // <- importante si no usas módulo global
})
export class ToolbarComponent implements OnInit {

  menuItems3 = [
    { icon: 'mdi:home-outline', route: '/admin' },
  ];

  nombreCompleto: string = '';
  nombreRol: string = '';
  private jwtHelper = inject(JwtHelperService);

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decoded = this.jwtHelper.decodeToken(token);
      this.nombreCompleto = `${decoded.nombres} ${decoded.apellidos}`;
      this.nombreRol = decoded.nombreRol;
    }
  }
}
