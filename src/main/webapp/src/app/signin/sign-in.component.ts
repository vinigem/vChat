import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AlertService } from '../alert/alert.service';

@Component({
    templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

    signInForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private http: HttpClient,
        private alertService: AlertService, private router: Router) { }

    ngOnInit() {
        this.signInForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (!this.signInForm.valid) {
            this.alertService.addAlert('Invalid username or password', 'error');
        } else {
            const user = this.signInForm.value;
            const token: string = btoa(user.username + ':' + user.password);
            const headers = new HttpHeaders({
                'Authorization': 'Basic ' + btoa(user.username + ':' + user.password),
                'X-Requested-With': 'XMLHttpRequest'
            });

            this.http.post('signin', {}, { headers }).subscribe(authResult => {
                if (authResult) {
                    this.authService.setToken(token);
                    this.router.navigate(['home']);
                } else {
                    this.alertService.addAlert('Invalid username or password', 'error');
                }
            }, error => {
                this.alertService.addAlert('Invalid username or password', 'error');
            });
        }
    }
}
