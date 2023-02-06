import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Env } from '../environment.dev';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {
  baseurl = Env.baseAPi;
  constructor(private http: HttpClient) { }
  employeeRegister(data:any){
    return this.http.post(this.baseurl+'/v1/employerRegistration/register',data)
  }
  loginFormEmployee(data:any){
    return this.http.post(this.baseurl+'/v1/employerRegistration/login',data)
  }
}
