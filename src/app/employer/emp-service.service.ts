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
    return this.http.get(this.baseurl+'/v1/employerRegistration/userDetails',{headers:{auth:Cookie.get('emptokens')}})
  }
  submitPostAJob(data:any){
    return this.http.post(this.baseurl+'/v1/employerdetail/createEmpDetails',data,{headers:{auth:Cookie.get('emptokens')}})
  }
  getdataAdvanceEmployeeDetails(){
    return this.http.get(this.baseurl+ '/v1/employerdetail/getEmpDetails',{headers:{auth:Cookie.get('emptokens')}})
  }
  myjobPost(){
    return this.http.get(this.baseurl+'/v1/employerdetail/getEmpDetails',{headers:{auth:Cookie.get('emptokens')}})
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
rcnt_search(){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/outSearchRecentSearch',{headers:{auth:Cookie.get('emptokens')}})
}
get_rcnt_search(id:any){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/recent_search_byId/'+ id,{headers:{auth:Cookie.get('emptokens')}})
}
get_industry(){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_Industry')
}
get_department(){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_Department')
}
get_category(id:any){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_Rolecategory/' + id)
}
get_role(id:any){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_Role/' + id)
}
save_search(data:any){
  return this.http.post(this.baseurl + "/v1/employerCandidateSearch/outSearchSave",data,{headers:{auth:Cookie.get('emptokens')}});

}
get_save_search(){
  return this.http.get(this.baseurl + "/v1/employerCandidateSearch/outSearchSaveData",{headers:{auth:Cookie.get('emptokens')}});
}
change_status(id:any,data:any){
  return this.http.put(this.baseurl+'/v1/employerdetail/update_active_deactive/' + id,data)
}
get_candidate_details(id:any){
  console.log('id',id);
  return this.http.get(this.baseurl+'/v1/candidateDetail/candidate_detials/' + id)

}
get_job_detail(id:any){
  return this.http.get(this.baseurl+'/v1/employerdetail/getByIdEmpDetails/' + id)

}
get_course_list(){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_allcourse')

}
}
