import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit, OnDestroy {

    public isLoggedIn: boolean;
    private loginSubscription: any;

    constructor(private authService: AuthService) {
        this.loginSubscription = this.authService.loginSubscription
            .subscribe(loggedIn => {
                this.isLoggedIn = loggedIn;
            });    
    }
    
    ngOnInit() {
        this.isLoggedIn = this.authService.isAuthenticated();    
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }

    logout(): void {
        this.authService.logout();
    }
}
