import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';

import { CommonInterceptor } from './interceptors/common.interceptor';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home/home.component';

import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';

import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';

import { TranslateService } from './translation/translate.service';
import { TranslatePipe } from './translation/translate.pipe';

import { OverlayService } from './overlay/overlay.service';
import { OverlayComponent } from './overlay/overlay.component';

import { InfoComponent } from './info/info.component';

import { TicTacToeComponent } from './tictactoe/tic-tac-toe.component';

import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';


@NgModule({
    declarations: [
        AppComponent, HeaderComponent, FooterComponent, AlertComponent, HomeComponent,
        SignInComponent, SignUpComponent, TranslatePipe, OverlayComponent, InfoComponent, TicTacToeComponent, ModalComponent
    ],
    imports: [
        BrowserModule, RoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
        AlertService, TranslateService, OverlayService, ModalService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
