import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let started = Date.now();
        return next
            .handle(request)
            .do(event => {
                if (event instanceof HttpResponse) {
                    let elapsed = Date.now() - started;
                    console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);
                }
            }); 
    }
}