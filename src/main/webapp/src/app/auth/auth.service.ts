import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
    
    loggedIn: boolean;
    loginSubscription = new BehaviorSubject<boolean>(this.loggedIn);

    constructor(private http: HttpClient) {}

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
     * logout and set logged in flag
     */
    logout() {
        localStorage.removeItem('token');
        this.setLoggedIn(false);
        window.location.href = "/logout";
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.getToken() != null;    
    }
    
    

}