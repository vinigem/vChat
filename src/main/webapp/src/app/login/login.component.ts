import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AlertService } from '../alert/alert.service';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private http: HttpClient,
        private alertService: AlertService, private router: Router) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if(!this.loginForm.valid){
            this.alertService.addAlert('Invalid form fields', 'error');
        }else{
            let user = this.loginForm.value;
            let token: string = btoa(user.username + ':' + user.password);
            let headers =  new HttpHeaders({
                'Authorization': 'Basic ' + btoa(user.username + ':' + user.password),
                'X-Requested-With': 'XMLHttpRequest'     
            });
                        
            this.http.post('signin', {}, {headers})
                .subscribe(authResult => {
                    if (authResult) {
                        this.authService.setToken(token);
                        this.router.navigate(['home']);
                    } else {
                        this.alertService.addAlert('Invalid login details', 'error');
                    }
                },
                err => {
                    this.alertService.addAlert('Something went wrong while authenticating!', 'error');
             });
        }
    }
}
