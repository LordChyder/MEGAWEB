import { Component, CUSTOM_ELEMENTS_SCHEMA, type OnInit, inject, type ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { JwtHelperService } from "@auth0/angular-jwt"

@Component({
  selector: "app-toolbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.css",
  providers: [JwtHelperService],
})
export class ToolbarComponent implements OnInit {
  @ViewChild("dropdownButton", { static: false }) dropdownButton!: ElementRef

  menuItems3 = [{ icon: "mdi:home-outline", route: "/admin" }]

  nombreCompleto = ""
  nombreRol = ""
  isDropdownOpen = false

  private jwtHelper = inject(JwtHelperService)
  private router = inject(Router)

  ngOnInit(): void {
    const token = localStorage.getItem("token")

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decoded = this.jwtHelper.decodeToken(token)
      this.nombreCompleto = `${decoded.nombres} ${decoded.apellidos}`
      this.nombreRol = decoded.nombreRol
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  onDocumentClick(event: Event): void {
    // Close dropdown if clicking outside of it
    if (this.dropdownButton && !this.dropdownButton.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false
    }
  }

  logout(): void {
    // Clear authentication data
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken") // if you have refresh token

    // Close dropdown
    this.isDropdownOpen = false

    // Redirect to login page
    this.router.navigate(["/login"])

    // Optional: Show logout message
    console.log("Sesión cerrada exitosamente")
  }
}
