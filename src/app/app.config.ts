import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, // ✅ importante
    JwtHelperService                                  // ✅ importante
  ]
};
