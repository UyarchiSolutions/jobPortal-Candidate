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
  verifyMobile(data:any){
    return this.http.post(this.baseurl+'/v1/employerRegistration/mobile_verify',data)
  }
  verify_otp(data:any){
    return this.http.post(this.baseurl+ '/v1/employerRegistration/mobile_verify_Otp',data)
  }
  viewBasicDetailsEmployee(){
    let local: any = localStorage.getItem('tokenloginEmplooyeee');
    return this.http.get(this.baseurl+'/v1/employerRegistration/userDetails',{
      headers: { auth: local}
    })
  }
  submitPostAJob(data:any){
    let local: any = localStorage.getItem('tokenloginEmplooyeee');
    return this.http.post(this.baseurl+'/v1/employerdetail/createEmpDetails',data,{
      headers: { auth: local },
    })
  }
  getdataAdvanceEmployeeDetails(){
    let local: any = localStorage.getItem('tokenloginEmplooyeee');
    return this.http.get(this.baseurl+ '/v1/employerdetail/getEmpDetails',{
      headers: { auth: local}
    })
  }
  myjobPost(){
    let local: any = localStorage.getItem('tokenloginEmplooyeee');
    return this.http.get(this.baseurl+'/v1/employerdetail/getEmpDetails',{
      headers : { auth: local}
    })
  }
}
