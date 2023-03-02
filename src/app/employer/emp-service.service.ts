import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Env } from '../environment.dev';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {
  baseurl = Env.baseAPi;
  constructor(private http: HttpClient) { }

  @Output() get_token: EventEmitter<String> = new EventEmitter();
  @Output() name: EventEmitter<String> = new EventEmitter();
    set_current_token(token:any)
    {
        console.log(token)
        this.get_token.emit(token);
    }
    get_usename(name:any){
      console.log(name,"sds")
      this.name.emit(name)
    }

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
    return this.http.get(this.baseurl+'/v1/employerRegistration/userDetails',{headers:{auth:Cookie.get('emptoken')}})
  }
  submitPostAJob(data:any){
    return this.http.post(this.baseurl+'/v1/employerdetail/createEmpDetails',data,{headers:{auth:Cookie.get('emptoken')}})
  }
  getdataAdvanceEmployeeDetails(){
    return this.http.get(this.baseurl+ '/v1/employerdetail/getEmpDetails',{headers:{auth:Cookie.get('emptoken')}})
  }
  myjobPost(){
    return this.http.get(this.baseurl+'/v1/employerdetail/getEmpDetails',{headers:{auth:Cookie.get('emptoken')}})
  }
  view_post(id: any,range:any,page:any){
    console.log(id)
    return this.http.get(this.baseurl + "/v1/employerdetail/getAllApplied_postjobs_Candidates/" + id +'/' + range + '/' + page);
  }
 view_can(data:any){
  console.log(data)
  return this.http.post(this.baseurl + "/v1/employerCandidateSearch/outSearch_employer",data,{headers:{auth:Cookie.get('emptoken')}});
 }
 getSkill(value:any){
  return this.http.get(this.baseurl+`/v1/employerdetail/keySkillData/${value}`)
}
rcnt_search(){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/outSearchRecentSearch',{headers:{auth:Cookie.get('emptoken')}})
}
get_rcnt_search(id:any){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/recent_search_byId/'+ id,{headers:{auth:Cookie.get('emptoken')}})
}
get_industry(){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_Industry')
}
get_department(){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_Department')
}
get_department_search(count:any){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_Department_all/'+count)
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
get_industry_search(count:any){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_Industries_all/'+count)

}
save_search(data:any){
  return this.http.post(this.baseurl + "/v1/employerCandidateSearch/outSearchSave",data,{headers:{auth:Cookie.get('emptoken')}});

}
get_save_search(){
  return this.http.get(this.baseurl + "/v1/employerCandidateSearch/outSearchSaveData",{headers:{auth:Cookie.get('emptoken')}});
}
change_status(id:any,data:any){
  return this.http.put(this.baseurl+'/v1/employerdetail/update_active_deactive/' + id,data)
}
get_candidate_details(id:any,jobid:any){
  console.log('id',id);
  return this.http.get(this.baseurl+'/v1/candidateDetail/candidate_detials/' + id+ '/' +jobid)
}
get_candidate_id(id:any){
  console.log('id',id);
  return this.http.get(this.baseurl+'/v1/candidateDetail/candidate_detials_id/' + id)
}
get_job_detail(id:any){
  return this.http.get(this.baseurl+'/v1/employerdetail/getByIdEmpDetails/' + id)

}
get_course_list(){
  return this.http.get(this.baseurl+'/v1/educationDetails/get_allcourse')

}
create_folder(data:any){
  return this.http.post(this.baseurl+'/v1/employerCandidateSearch/createSavetoFolder',data,{headers:{auth:Cookie.get('emptoken')}})
}
get_folder_list(){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/saveFolderData_view',{headers:{auth:Cookie.get('emptoken')}})
}
get_folder_details(data:any){
  const queryString = new URLSearchParams(data).toString();
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/allFolderData?'+ queryString)
}
sendajob(data:any){
  return this.http.post(this.baseurl+'/v1/employerdetail/send_mail_and_notification',data,{headers:{auth:Cookie.get('emptoken')}})
}
get_notify_job(){
  return this.http.get(this.baseurl+'/v1/employerdetail/getAll_Mail_notification_employerside',{headers:{auth:Cookie.get('emptoken')}})
}
job_preview(id:any){
  return this.http.get(this.baseurl+'/v1/employerdetail/get_job_post/'+id)

}
get_all_saved_folder(){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/saveFolderData_view_All_data',{headers:{auth:Cookie.get('emptoken')}})

}
get_all_savedsearch(){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/outSearchSaveData_all',{headers:{auth:Cookie.get('emptoken')}})
}
edit_folder(data:any){
  return this.http.put(this.baseurl+'/v1/employerCandidateSearch/edit_all_folder',data,{headers:{auth:Cookie.get('emptoken')}})

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
  return this.http.post(this.baseurl+'/v1/employerdetail/create_Recruiter',data,{headers:{auth:Cookie.get('emptoken')}})

}
get_recruiter(){
  return this.http.get(this.baseurl+'/v1/employerdetail/get_Recruiter',{headers:{auth:Cookie.get('emptoken')}})
}
getdetails_recruiter(id:any){
  return this.http.get(this.baseurl+'/v1/employerdetail/get_Recruiter_id/'+id,{headers:{auth:Cookie.get('emptoken')}})
}
edit_recruiter(id:any,data:any){
  return this.http.put(this.baseurl+'/v1/employerdetail/Recruiter_edit/'+id,data,{headers:{auth:Cookie.get('emptoken')}})
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
get_city(){
return this.http.get(this.baseurl+'/v1/district/getAllDistrict_all/all')
}
saved_can(data:any){
  return this.http.post(this.baseurl+'/v1/employerCandidateSearch/createSaveSeprate',data,{headers:{auth:Cookie.get('emptoken')}})
}
getall_saved_candidates(range:number,page:number){
  return this.http.get(this.baseurl+'/v1/employerCandidateSearch/getSaveSeprate/'+range+'/'+page,{headers:{auth:Cookie.get('emptoken')}})
}
updatePostAJob(id:any,data:any){
return this.http.put(this.baseurl+'/v1/employerdetail/updateEmpDetails/'+id,data)
}
get_mail_notification(range:number,page:number){
return this.http.get(this.baseurl+'/v1/employerdetail/getAll_Mail_notification_employerside/'+range+'/'+page,{headers:{auth:Cookie.get('emptoken')}})
}
notes(data:any){
  return this.http.post(this.baseurl+'/v1/employerdetail/employer_comment',data,{headers:{auth:Cookie.get('emptoken')}})
}
get_notes(id:any){
  return this.http.get(this.baseurl+'/v1/employerdetail/employer_comment_id/'+id,{headers:{auth:Cookie.get('emptoken')}})

}
edit_notes(id:any,data:any){
return this.http.put(this.baseurl+'/v1/employerdetail/comment_edit/'+id,data)
}
get_location_search(data:any){
return this.http.get(this.baseurl+'/v1/district/'+data)

}
get_area_location(value:any){
  const queryString = new URLSearchParams(value).toString();
  return this.http.get(this.baseurl+'/v1/employerdetail/location_api?'+queryString)
}
}
