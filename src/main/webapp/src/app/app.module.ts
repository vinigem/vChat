import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';

import { CommonInterceptor } from './interceptors/common.interceptor';

import { AppComponent } from './app.component';
import { SecureLayoutComponent } from './layout/secure-layout.component';
import { PublicLayoutComponent } from './layout/public-layout.component';
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

import { OverlayService } from './overlay/overlay.service';
import { OverlayComponent } from './overlay/overlay.component';

import { InfoComponent } from './info/info.component';

import { TicTacToeComponent } from './tictactoe/tic-tac-toe.component';

@NgModule({
    declarations: [
        AppComponent, SecureLayoutComponent, PublicLayoutComponent, NavBarComponent, FooterBarComponent, AlertComponent,
        HomeComponent, SignInComponent, SignUpComponent, TranslatePipe, OverlayComponent, InfoComponent, TicTacToeComponent
    ],
    imports: [
        BrowserModule, RoutingModule, HttpClientModule, ReactiveFormsModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
        AlertService, ChatService, TranslateService, OverlayService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
