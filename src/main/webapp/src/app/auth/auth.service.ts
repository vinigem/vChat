import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

    loggedIn: boolean;
    loginSubscription = new BehaviorSubject<boolean>(this.loggedIn);

    constructor(private http: HttpClient, private router: Router) {}

    setLoggedIn(value: boolean) {
        this.loggedIn = value;
        this.loginSubscription.next(value);
    }


    /**
     * set auth token
     */
    setToken(token: string) {
        localStorage.setItem('token', token);
        this.setLoggedIn(true);
    }

    /**
     * get auth token
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * remove token and disable logged in flag and redirect to route
     */
    logout() {
        localStorage.removeItem('token');
        this.setLoggedIn(false);
        this.router.navigate(['info', '1']);
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.getToken() != null;
    }



}
