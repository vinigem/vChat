import { Component, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
    templateUrl: './secure-layout.component.html'
})
export class SecureLayoutComponent implements OnDestroy {

    constructor(private authService: AuthService) {}

    ngOnDestroy() {
        this.authService.logout();
    }

}
