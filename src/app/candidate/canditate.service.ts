import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
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
  // update profile for candidates
  updateProfile(data:any){
    return this.http.post(this.baseUrl+ '/v1/candidateDetail/createKeyskill',data,{headers:{auth:Cookie.get('tokens')}})
  }
  // image upload
  imageUpload(id:any,data:any){
    return this.http.put(this.baseUrl+`/v1/candidateDetail/updateByIdImage/${id}`,data)
  }
  //language
  getKeyskill(){
    return this.http.get(this.baseUrl+'/v1/candidatedetail/languages')
  }
  // skill
  getSkill(value:any){
    return this.http.get(this.baseUrl+`/v1/employerdetail/keySkillData/${value}`)
  }
  // getShops
  getAlldetails(data:any){
    return this.http.post(this.baseUrl+'/v1/candidatedetail/candidateSearch_front_page',data,{headers:{auth:Cookie.get('tokens')}})
  }
  getJobs(id:any){
    return this.http.get(this.baseUrl+`/v1/candidateDetail/getByIdEmployerDetailsShownCandidate/${id}`,{headers:{auth:Cookie.get('tokens')}})
  }
}
