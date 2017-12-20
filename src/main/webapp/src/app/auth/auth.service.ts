import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
    
    loginSubscription = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {}

    setLoggedIn(value: boolean) {
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
        this.http.get('logout')
            .subscribe(() => {
                localStorage.removeItem('token');
                this.setLoggedIn(false);
            })
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.getToken() != null;    
    }
    
    

}