import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideOAuthClient} from 'angular-oauth2-oidc';
import {UserManagementInterceptor} from './interceptors/user-management.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient(),
    { provide: HTTP_INTERCEPTORS, useClass: UserManagementInterceptor, multi: true },
  ]
};
