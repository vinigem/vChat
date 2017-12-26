import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
        
    private excludedUrls = ['signin', 'signup'];
        
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.excludedUrls.indexOf(request.url) === -1 && request.url.indexOf('i18n') === -1) {
            // Add auth token
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${localStorage.getItem('token')}`
                }
            });
        }
        
        return next.handle(request); 
    }
}