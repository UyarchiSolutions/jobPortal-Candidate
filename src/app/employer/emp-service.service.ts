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
get_roles(count:any){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_Role_all/'+count)
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
get_candidate_details(id:any,jobid:any){
  console.log('id',id);
  return this.http.get(this.baseurl+'/v1/candidateDetail/candidate_detials/' + id+ '/' +jobid)
}
get_job_detail(id:any){
  return this.http.get(this.baseurl+'/v1/employerdetail/getByIdEmpDetails/' + id)

}
get_course_list(){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_allcourse')

}
create_folder(data:any){
  return this.http.post(this.baseurl+'/v1/employerCandidateSearch/createSavetoFolder',data,{headers:{auth:Cookie.get('emptokens')}})
}
get_folder_list(){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/saveFolderData_view',{headers:{auth:Cookie.get('emptokens')}})
}
get_folder_details(data:any){
  const queryString = new URLSearchParams(data).toString();
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/allFolderData?'+ queryString)
}
sendajob(data:any){
  return this.http.post(this.baseurl+'/v1/employerdetail/send_mail_and_notification',data,{headers:{auth:Cookie.get('emptokens')}})
}
get_notify_job(){
  return this.http.get(this.baseurl+'/v1/employerdetail/getAll_Mail_notification_employerside',{headers:{auth:Cookie.get('emptokens')}})
}
job_preview(id:any){
  return this.http.get(this.baseurl+'/v1/employerdetail/get_job_post/'+id)

}
get_all_saved_folder(){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/saveFolderData_view_All_data',{headers:{auth:Cookie.get('emptokens')}})

}
get_all_savedsearch(){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/outSearchSaveData_all',{headers:{auth:Cookie.get('emptokens')}})
}
edit_folder(data:any){
  return this.http.put(this.baseurl+'/v1/employerCandidateSearch/edit_all_folder',data,{headers:{auth:Cookie.get('emptokens')}})

}
delete_folder(id:any,data:any){
  console.log('delete folder',data)
  return this.http.delete(this.baseurl+'/v1/employerCandidateSearch/delete_folder/'+id +'/'+data)

}
delete_search(data:any){
  console.log('delete search',data)
  return this.http.put(this.baseurl+'/v1/employerCandidateSearch/recent_saver_search_delete',data)

}
addrecruiter(data:any){
  return this.http.post(this.baseurl+'/v1/employerdetail/create_Recruiter',data,{headers:{auth:Cookie.get('emptokens')}})

}
get_recruiter(){
  return this.http.get(this.baseurl+'/v1/employerdetail/get_Recruiter',{headers:{auth:Cookie.get('emptokens')}})
}
getdetails_recruiter(id:any){
  return this.http.get(this.baseurl+'/v1/employerdetail/get_Recruiter_id/'+id,{headers:{auth:Cookie.get('emptokens')}})
}
edit_recruiter(id:any,data:any){
  return this.http.put(this.baseurl+'/v1/employerdetail/Recruiter_edit/'+id,data,{headers:{auth:Cookie.get('emptokens')}})
}
delete_recruiter(id:any){
  return this.http.delete(this.baseurl+'/v1/employerdetail/Recruiter_delete/'+id)
}
get_qualification(){
  return this.http.get(this.baseurl+'/v1/educationDetails')

}
get_courses(data:any){
  return this.http.post(this.baseurl+'/v1/educationdetails/get_Qualification',data)

}
get_specialization(data:any){
  return this.http.post(this.baseurl+'/v1/educationdetails/get_all_specialization',data)

}
change_status_candidates(id:any,data:any){
  return this.http.put(this.baseurl+'/v1/employerdetail/statusChange_employer/'+id,data)
}
}
