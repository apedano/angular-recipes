import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppStateService } from "../app-state.service";


@Injectable()
export class LoggingHttpInterceptor implements HttpInterceptor {
    
    constructor(private appStateService: AppStateService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.appStateService.logIfDebug("Intercepted HTTP request", req);
        return next.handle(req); //triggers the next interceptor in the chain
    }
}