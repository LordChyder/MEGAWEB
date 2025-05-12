import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"


interface MenuItem {
  label: string
  icon: string
  route: string
  color: string
}

@Component({
  selector: "app-sidebar-empresa",
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./sidebar-empresa.component.html",
  styleUrls: ['./sidebar-empresa.component.css']
})
export class SidebarEmpresaComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: "Presentación",
      icon: "mdi:presentation",
      route: "presentacion",
      color: "bg-orange-400",
    },
    {
      label: "Misión",
      icon: "mdi:flag",
      route: "/empresa/mision",
      color: "bg-teal-500",
    },
    {
      label: "Visión",
      icon: "mdi:eye",
      route: "/empresa/vision",
      color: "bg-teal-500",
    },
    {
      label: "Ubicación",
      icon: "mdi:map-marker",
      route: "/empresa/ubicacion",
      color: "bg-teal-500",
    },
    {
      label: "Contacto",
      icon: "mdi:phone",
      route: "/empresa/contacto",
      color: "bg-teal-500",
    },
  ]

  constructor(private router: Router) {}
  ngOnInit(): void {
    throw new Error("Method not implemented.")
  }

  navigateTo(route: string): void {
    this.router.navigate([route])
  }

  isActive(route: string): boolean {
    return this.router.url === route
  }
}