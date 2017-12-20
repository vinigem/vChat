import { Component, OnDestroy } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
    
    constructor(private authService: AuthService){}
    
    ngOnDestroy() {
        this.authService.logout();    
    }

}
