import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { NgxSpinnerService } from "ngx-spinner"; 
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.service';  
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})


export class AuthComponent {
    isLoginMode: boolean = true;
    error: string = null;

    constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }

        let authObservable: Observable<AuthResponseData>

        const email = form.value.email;
        const password = form.value.password;

        this.spinner.show();

        if(this.isLoginMode){
            authObservable = this.authService.signIn(email, password);
        }else {
            authObservable = this.authService.signUp(email, password);
        }

        authObservable.subscribe(rData=>{
            this.spinner.hide();
            this.router.navigate(['/recipes']);
        }, errorMsg =>{
            this.spinner.hide();
            this.error = errorMsg;
            
        })

        form.reset();
    }

}