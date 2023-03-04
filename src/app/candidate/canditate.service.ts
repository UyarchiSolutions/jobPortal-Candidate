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
  // apply job
  applyJobs(data:any){
    return this.http.post(this.baseUrl+`/v1/candidateDetail/createCandidatePostjob`,data,{headers:{auth:Cookie.get('tokens')}})
  }
  // save job
  saveJob(data:any){
    return this.http.post(this.baseUrl+`/v1/candidateDetail/createCandidateSavejob`,data,{headers:{auth:Cookie.get('tokens')}})
  }
  // get applied jobd
  getAppliedJobs(value:any){
    return this.http.get(this.baseUrl+`/v1/candidateDetail/getByIdAppliedJobs/${value}`,{headers:{auth:Cookie.get('tokens')}})
  }
  // get saved
  getSavedJob(){
    return this.http.get(this.baseUrl+`/v1/candidateDetail/getByIdSavedJobs`,{headers:{auth:Cookie.get('tokens')}})
  }
  // get no
  getRecentsearch(){
    return this.http.get(this.baseUrl+`/v1/candidateDetail/recentSearch`,{headers:{auth:Cookie.get('tokens')}})
  }
  updateEduction(data:any){
    return this.http.post(this.baseUrl+'/v1/candidateDetail/updateKeyskill',data,{headers:{auth:Cookie.get('tokens')}})
  }
  // education details
  educationDetail(data:any){
    return this.http.post(this.baseUrl+`/v1/candidateDetail/updateEducation`,data,{headers:{auth:Cookie.get('tokens')}})
  }
  // current industry
  currentIndustry(){
    return this.http.get(this.baseUrl+'/v1/educationDetails/get_Industry')
  }
  // current department
  currentDepartment(){
    return this.http.get(this.baseUrl+'/v1/educationDetails/get_Department')
  }
  // get Category
  getCategory(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_Rolecategory/${id}`)
  }
  // getRole
  getRole(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_Role/${id}`)
  }
  getReacent_data(id:any){
    return this.http.get(this.baseUrl+`/v1/candidateDetail/recentSearch_byId/${id}`)
  }
  // save search
  saveSearch(data:any){
    return this.http.post(this.baseUrl+'/v1/candidateDetail/createdSearchhistory',data,{headers:{auth:Cookie.get('tokens')}})
  }
  // getSavedSearch
  getSave(){
    return this.http.get(this.baseUrl+'/v1/candidateDetail/createdSearchhistoryData',{headers:{auth:Cookie.get('tokens')}})
  }
  // get all qualification
  getQualification(){
    return this.http.get(this.baseUrl+`/v1/educationDetails`)
  }
  // docterate
  getdoctorate(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_drcourse/${id}`)
  }
  // doctorate spe
  getDrSped(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_drspecialization/${id}`)
  }
  // pgcourse
  getPgcourses(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_pg_course/${id}`)
  }
  // pg Sepciat
  getPgSpecial(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_pgspecialization/${id}`)
  }
  // getug course
  grtUgcou(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_ug_course/${id}`)
  }
  // ugSep
  ugSepcial(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_specialization/${id}`)
  }
  // hsc course
  hsccourse(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_hsc_course/${id}`)
  }
  // sslc course
  sslcSpecial(id:any){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_sslc_course/${id}`)
  }
  // language
  getLanguages(){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_medium`)
  }
  // getSaveData
  saveddata(id:any){
    return this.http.get(this.baseUrl+`/v1/candidateDetail/createdSearchhistoryData_byId/${id}`,{headers:{auth:Cookie.get('tokens')}})
  }
  // serAlert
  alertSet(data:any){
    return this.http.post(this.baseUrl+`/v1/candidateDetail/updateKeyskill`,data,{headers:{auth:Cookie.get('tokens')}})
  }
  // get all aterts
  getAlerts(){
    return this.http.get(this.baseUrl+`/v1/candidatedetail/SearchByIdcandidataSearchEmployerSet`,{headers:{auth:Cookie.get('tokens')}})
  }
  // notification
  getallNotification(id:any){
    this.http.get(this.baseUrl+``)
  }
  // view all details
  viewDetails(){
   return this.http.get(this.baseUrl+`/v1/candidateDetail/getKeyskill`,{headers:{auth:Cookie.get('tokens')}})
  }
  // get notification
  getAllNotification(){
    return this.http.get(this.baseUrl+`/v1/employerdetail/getAll_Mail_notification_candidateside`,{headers:{auth:Cookie.get('tokens')}})
  }
  // applyJobswithmail
  applyJob_mail(id:any){
    return this.http.get(this.baseUrl+`/v1/employerdetail/get_job_post_candidate/${id}`,{headers:{auth:Cookie.get('tokens')}})
  }
  courseAll(){
    return this.http.get(this.baseUrl+`/v1/educationDetails/get_allcourse`)
  }
// change password
changePassword(data:any){
  return this.http.post(this.baseUrl+`/v1/candidateRegistration/change_pass`,data,{headers:{auth:Cookie.get('tokens')}})
}
// get Role
getlimitRole(range:any){
  return this.http.get(this.baseUrl+`/v1/educationDetails/get_Role_all/${range}`)
}
// get deparment
getlimitDepartment(range:any){
  return this.http.get(this.baseUrl+`/v1/educationDetails/get_Department_all/${range}`)
}
// get eduction
getlimitEducation(range:any){
  return this.http.get(this.baseUrl+`/v1/educationDetails/get_alleducation_all/${range}`)
}
// get industry
getlimitIndustry(range:any){
  return this.http.get(this.baseUrl+`/v1/educationDetails/get_Industries_all/${range}`)
}
// deactive profile
deactivate(){
  return this.http.get(this.baseUrl+`/v1/candidateRegistration/deactivate`,{headers:{auth:Cookie.get('tokens')}})
}
// forgotPassword
sendmodile(data:any){
  return this.http.post(this.baseUrl+`/v1/candidateRegistration/forget_password`,data)
}
// otp
sendOTp(data:any){
  return this.http.post(this.baseUrl+`/v1/candidateRegistration/forget_password_Otp`,data)
}
// forgot password
forgotPassword(id:any,data:any){
  return this.http.post(this.baseUrl+`/v1/candidateRegistration/forget_password_set/${id}`,data)
}
// get all location
getLocation(){
  return this.http.get(this.baseUrl+`/v1/district/getAllDistrict_all/all`)
}
eduction(data:any){
  return this.http.put(this.baseUrl+`/v1/candidateDetail/edit_details`,data,{headers:{auth:Cookie.get('tokens')}})
}
can_report(data:any){
  return this.http.post(this.baseUrl+`/v1/faqe/create_report`,data,{headers:{auth:Cookie.get('tokens')}})

}
// key up preferd
get_prefered(val:any){
  return this.http.get(this.baseUrl+`/v1/educationDetails/get_Industries_all_search/${val}`)
}
// edit basic dtails
edit_basic(id:any,data:any){
return this.http.put(this.baseUrl+`/v1/candidateRegistration/getUser_update/${id}`,data,{headers:{auth:Cookie.get('tokens')}})
}
verifymail(id:any,data:any){
  return this.http.put(this.baseUrl+`/v1/candidateRegistration/update_email_send_otp/${id}`,data)
}
verifiedMail(data:any){
  return this.http.post(this.baseUrl+`/v1/candidateRegistration/update_email_send_otp_verify`,data)
}
verify_mobile(id:any,data:any){
  return this.http.put(this.baseUrl+`/v1/candidateRegistration/update_mobilenumber_send_otp/${id}`,data)
}
verifiedMobile(data:any){
  return this.http.post(this.baseUrl+`/v1/candidateRegistration/update_mobilenumber_otp_verify`,data)
}
// location
get_allLocation(data:any){
  const value={
    input:data
  }
  let query = new URLSearchParams(value).toString();
  return this.http.get(this.baseUrl+`/v1/employerdetail/location_api?`+query)
}
//ssls borad
get_Board(id:any){
  return this.http.get(this.baseUrl+`/v1/educationDetails/get_sslc_course/${id}`)
}
}
