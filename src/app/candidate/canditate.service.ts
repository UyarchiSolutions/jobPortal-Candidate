import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CanditateService {
  baseUrl = Env.baseAPi
  constructor(private http: HttpClient) { }
  loginForm(data: any) {
    return this.http.post(this.baseUrl + '/v1/candidateRegistration/login', data)
  }
  // submit candidate Details
  submitcandicate(data: any) {
    return this.http.post(this.baseUrl + '/v1/candidateRegistration/register', data)
  }
  // mobile verification setd otp
  verifyMobile(data:any){
    return this.http.post(this.baseUrl+'/v1/candidateRegistration/mobile_verify',data)
  }
  // verify
  verify_otp(data:any){
    return this.http.post(this.baseUrl+ '/v1/candidateRegistration/mobile_verify_Otp',data)
  }
}
