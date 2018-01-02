import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './interceptors/token.interceptor';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

import { HomeComponent } from './home/home.component';

import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';

import { InfoComponent } from './info/info.component';

const routes: Routes = [
    { path: '', canActivate:[AuthGuard], 
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent }
        ]
    },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'info/:type', component: InfoComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, AuthGuard, AuthService],
    exports: [RouterModule]
})
export class RoutingModule { }