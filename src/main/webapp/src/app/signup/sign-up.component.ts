import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AlertService } from '../alert/alert.service';

@Component({
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private alertService: AlertService,
        private router: Router) { }

    ngOnInit() {
        this.initForm();
    }
    
    private initForm() {
        this.signUpForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });    
    }

    onSubmit() {
        if(!this.signUpForm.valid){
            this.alertService.addAlert('Invalid form fields', 'error');
        }else{
            let user = this.signUpForm.value;
                        
            this.http.post('signup', user)
                .subscribe(status => {
                    if (status) {
                        this.alertService.addAlert('Sign Up is successful. Proceed to sign in page', 'success');
                        this.initForm();
                    } else {
                        this.alertService.addAlert('Sign Up failed', 'error');
                    }
                },
                err => {
                    this.alertService.addAlert('Something went wrong while sign up!', 'error');
             });
        }
    }
}
