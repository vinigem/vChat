import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './interceptors/token.interceptor';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

import { HomeComponent } from './home/home.component';

import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';

const routes: Routes = [
    { path: '', canActivate:[AuthGuard], 
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent }
        ]
    },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, AuthGuard, AuthService],
    exports: [RouterModule]
})
export class RoutingModule { }