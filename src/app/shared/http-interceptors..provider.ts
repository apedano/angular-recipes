import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingHttpInterceptor } from './logging-http.interceptor';



/** Array of Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [ 
  { provide: HTTP_INTERCEPTORS, useClass: LoggingHttpInterceptor, multi: true }
 
];