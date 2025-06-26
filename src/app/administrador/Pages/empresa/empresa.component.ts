import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SidebarEmpresaComponent } from '../../../shared/sidebar-empresa/sidebar-empresa.component';
import { filter } from 'rxjs/operators';

interface MobileMenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarEmpresaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent implements OnInit {
  
  currentRoute: string = '';

  mobileMenuItems: MobileMenuItem[] = [
    {
      label: "Presentación",
      icon: "mdi:book-open-page-variant",
      route: "presentacion"
    },
    {
      label: "Misión",
      icon: "mdi:flag",
      route: "mision"
    },
    {
      label: "Visión",
      icon: "mdi:eye",
      route: "vision"
    },
    {
      label: "Dirección",
      icon: "mdi:map-marker",
      route: "direccion"
    },
    {
      label: "Teléfono",
      icon: "mdi:phone",
      route: "telefono"
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escuchar cambios de ruta para actualizar el estado activo
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.updateCurrentRoute((event as NavigationEnd).url);
    });

    // Establecer ruta inicial
    this.updateCurrentRoute(this.router.url);
  }

  private updateCurrentRoute(url: string): void {
    const segments = url.split('/');
    this.currentRoute = segments[segments.length - 1];
  }

  navigateToMobile(route: string): void {
    this.router.navigate(['/admin/empresa', route]);
  }

  getMobileButtonClass(route: string): string {
    const isActive = this.currentRoute === route;
    return isActive 
      ? 'bg-orange-500 text-white shadow-md' 
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
  }
}