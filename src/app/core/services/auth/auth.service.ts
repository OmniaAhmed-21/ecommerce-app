import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { IuserData } from '../../../shared/interfaces/iuser-data';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient:HttpClient){}
    private readonly router = inject(Router)

    userData:IuserData[] = [] ;

    sendRegisterForm(data:object):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data );
    }

    sendLoginForm(data:object):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , data)
    }

    saveUserData():void{
        if(localStorage.getItem('userToken') !== null){
            this.userData = jwtDecode(localStorage.getItem('userToken')!)
        }
    }

    logOut():void{
        localStorage.removeItem("userToken")
        this.userData = [];
        this.router.navigate(['/login'])
    };

    setEmailVerify(data:string):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
    };

    setCodeVerify(data:string):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
    }

    setResetPas(data:string):Observable<any>{
        return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
    }

    

}
