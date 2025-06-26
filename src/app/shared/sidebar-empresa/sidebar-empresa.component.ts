import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, Router } from "@angular/router"

interface MenuItem {
  label: string
  icon: string
  route: string
  color: string
  activeColor : string
}

@Component({
  selector: "app-sidebar-empresa",
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./sidebar-empresa.component.html",
  styleUrls: ['./sidebar-empresa.component.css']
})
export class SidebarEmpresaComponent {

  constructor(private router: Router) {}

  menuItems: MenuItem[] = [
    {
      label: "Presentación",
      icon: "mdi:book-open-page-variant",
      route: "presentacion",
      color: "bg-teal-500",
      activeColor: "bg-orange-500"
    },
    {
      label: "Misión",
      icon: "mdi:flag",
      route: "mision",
      color: "bg-teal-500",
      activeColor: "bg-orange-500"
    },
    {
      label: "Visión",
      icon: "mdi:eye",
      route: "vision",
      color: "bg-teal-500",
      activeColor: "bg-orange-500"
    },
    {
      label: "Dirección",
      icon: "mdi:map-marker",
      route: "direccion",
      color: "bg-teal-500",
      activeColor: "bg-orange-500"
    },
    {
      label: "Teléfono",
      icon: "mdi:phone",
      route: "telefono",
      color: "bg-teal-500",
      activeColor: "bg-orange-500"
    },
  ];

  navigateTo(route: string): void {
    this.router.navigate([route], { relativeTo: this.router.routerState.root.firstChild?.firstChild });
  }

  isActive(route: string): boolean {
    return this.router.url.endsWith(route);
  }
}