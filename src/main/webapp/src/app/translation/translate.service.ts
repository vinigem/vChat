import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TranslateService {

    private currentLanguage = 'en';
    private translations = [];
    private languages = [];

    languageSubscription = new BehaviorSubject<any>(this.languages);

    constructor(private http: HttpClient) {
        this.loadLanguages();
        this.loadTranslation();
    }

    translate(key: string): string {
        if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) {
            return this.translations[this.currentLanguage][key];
        } else {
            return key;
        }
    }

    /**
     * change/select current app language
     */
    selectLanguage(language: string) {
        this.currentLanguage = language;
        if (!this.translations[this.currentLanguage]) {
            this.loadTranslation();
        }
    }

    /**
     * get app supported languages
     */
    getSupportedLanguages(): Array<any> {
        return this.languages;
    }

    /**
     * get current app language
     */
    getCurrentLanguage(): string {
        return this.currentLanguage;
    }

    /**
     * load languages supported by application
     */
    private loadLanguages(): void {
        const languagesFile = '../../i18n/languages.json';

        this.http.get(languagesFile).subscribe((result: any) => {
            this.languages = result;
            this.languageSubscription.next(this.languages);
        });
    }

    /**
     * load translations for current language
     */
    private loadTranslation(): void {
        const file = '../../i18n/lang_' + this.currentLanguage + '.json';

        this.http.get(file).subscribe((result: any) => {
            this.translations[this.currentLanguage] = result;
        });
    }


}
