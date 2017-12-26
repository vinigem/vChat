import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';

import { LoggingInterceptor } from './interceptors/logging.interceptor';

import { AppComponent } from './app.component';
import { NavBarComponent } from './navigation/nav-bar.component';
import { FooterBarComponent } from './footer/footer-bar.component';

import { HomeComponent } from './home/home.component';

import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';

import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';

import { ChatService } from './chat/chat.service';

import { TranslateService } from './translation/translate.service';
import { TranslatePipe } from './translation/translate.pipe';



@NgModule({
    declarations: [
        AppComponent, NavBarComponent, FooterBarComponent, AlertComponent, HomeComponent, SignInComponent, SignUpComponent,
        TranslatePipe
    ],
    imports: [
        BrowserModule, RoutingModule, HttpClientModule, ReactiveFormsModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
        AlertService, ChatService, TranslateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
