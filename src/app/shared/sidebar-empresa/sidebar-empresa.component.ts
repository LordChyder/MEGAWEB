import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NavigationEnd, Router, RouterModule } from "@angular/router"
import { filter } from "rxjs/operators"

export interface SidebarMenuItem {
  icon: string
  label: string
  route: string
  color?: string
}

@Component({
  selector: "app-sidebar-empresa",
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./sidebar-empresa.component.html",
})
export class SidebarEmpresaComponent implements OnInit {
  @Input() menuItems: SidebarMenuItem[] = [
    {
      icon: "mdi:book-open-page-variant",
      label: "Presentación",
      route: "/empresa/presentacion",
      color: "bg-orange-400", // Color naranja para presentación
    },
    {
      icon: "mdi:flag",
      label: "Misión",
      route: "/empresa/mision",
      color: "bg-teal-500", // Color teal para misión
    },
    {
      icon: "mdi:eye",
      label: "Visión",
      route: "/empresa/vision",
      color: "bg-teal-500", // Color teal para visión
    },
    {
      icon: "mdi:map-marker",
      label: "Dirección",
      route: "/empresa/direccion",
      color: "bg-teal-500", // Color teal para dirección
    },
    {
      icon: "mdi:phone",
      label: "Teléfono",
      route: "/empresa/telefono",
      color: "bg-teal-500", // Color teal para teléfono
    },
  ]

  activeRoute = ""

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detectar la ruta activa
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateActiveRoute()
    })

    // Inicializar la ruta activa
    this.updateActiveRoute()
  }

  updateActiveRoute(): void {
    const currentUrl = this.router.url
    const activeItem = this.menuItems.find((item) => currentUrl.includes(item.route))

    if (activeItem) {
      this.activeRoute = activeItem.route
    }
  }

  isActive(route: string): boolean {
    return this.activeRoute === route
  }

  navigateTo(route: string): void {
    this.router.navigate([route])
  }
}
