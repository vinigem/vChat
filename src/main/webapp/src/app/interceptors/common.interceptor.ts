import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { OverlayService } from '../overlay/overlay.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
        
    constructor(private overlayService: OverlayService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // call to show overlay
        this.overlayService.showOverlay();
        
        //  request start time
        let started = Date.now();
        return next
            .handle(request)
            .do(event => {
                if (event instanceof HttpResponse) {
                    let elapsed = Date.now() - started;
                    console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);
                }
                // call to hide overlay
                this.overlayService.hideOverlay();
            }); 
    }
}