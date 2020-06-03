import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';
import { UserAuth } from './user-auth.model';


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<UserAuth>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router){}

    signUp(email: string, password: string){

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmHXcmPK22hfMwmteTpNY0fCpkjfoNtYs', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.errorHandling), 
            tap(rData=>{
                this.handleAuthentication(rData.email, rData.localId, rData.idToken, +rData.expiresIn);
            })
        )
    }

    signIn(email: string, password: string){

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmHXcmPK22hfMwmteTpNY0fCpkjfoNtYs', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.errorHandling), 
            tap(rData=>{
                this.handleAuthentication(rData.email, rData.localId, rData.idToken, +rData.expiresIn);
            })
        )
    }


    // Auto Login
    onReloadPage(){
        const userData: {
            email: string,
            id: string, 
            token: string, 
            tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser = new UserAuth(userData.email, userData.id, userData.token, new Date(userData.tokenExpirationDate));

        if(loadedUser.getToken){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logOut()
        }, expirationDuration);
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new UserAuth(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user));
    }   

    private errorHandling(errorRes: HttpErrorResponse){
        let errMsg = "Unknown Error Occured";
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errMsg)
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errMsg = 'Email Already Exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errMsg = 'Email Doesn\'t Exist';
                break;
            case 'INVALID_PASSWORD':
                errMsg = 'Invalid Password Entered';
                break;
        }
        return throwError(errMsg);
    }
}