import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Env } from '../environment.dev';
import { Cookie } from 'ng2-cookies';

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
    return this.http.get(this.baseurl+'/v1/employerRegistration/userDetails',{headers:{auth:Cookie.get('emptokens')}})
  }
  submitPostAJob(data:any){
    return this.http.post(this.baseurl+'/v1/employerdetail/createEmpDetails',data,{headers:{auth:Cookie.get('emptokens')}})
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
  view_post(id: any){
    console.log(id)
    return this.http.get(this.baseurl + "/v1/employerdetail/getAllApplied_postjobs_Candidates/" + id);
  }
 view_can(data:any){
  console.log(data)
  return this.http.post(this.baseurl + "/v1/employerCandidateSearch/outSearch_employer",data,{headers:{auth:Cookie.get('emptokens')}});
 }
 getSkill(value:any){
  return this.http.get(this.baseurl+`/v1/employerdetail/keySkillData/${value}`)
}
}
