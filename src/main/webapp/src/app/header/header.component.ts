import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TranslateService } from '../translation/translate.service';

@Component({
    selector: 'cHeader',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    isLoggedIn: boolean;
    selectedLanguage: string;
    languages = [];

    private loginSubscription: any;
    private languageSubscription: any;

    constructor(private authService: AuthService, private translateService: TranslateService) {
        this.loginSubscription = this.authService.loginSubscription
            .subscribe(loggedIn => {
                this.isLoggedIn = loggedIn;
            });

        this.languageSubscription = this.translateService.languageSubscription
            .subscribe(data => {
                this.languages = data;
            });
    }

    ngOnInit() {
        this.isLoggedIn = this.authService.isAuthenticated();
        this.selectedLanguage = this.translateService.getCurrentLanguage();
    }

    selectLanguage(language: any): void {
        this.translateService.selectLanguage(language.code);
        this.selectedLanguage = language.code;
    }

    logout(): void {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.languageSubscription.unsubscribe();
    }
}
