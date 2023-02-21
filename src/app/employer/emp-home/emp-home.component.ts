import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.css']
})
export class EmpHomeComponent implements OnInit {
  data: any;
  applied_data: any;
  isDisplay=false
  isDisplayad=false
  keySkill: any;
  value: any;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'Course',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  notesForm:any = this.fb.group({
    comment: new FormControl('',Validators.required)
  })
  searchForm: any = this.fb.group({
    keyskills: new FormControl([]),
    Location: new FormControl([]),
    experience: new FormControl(null),
    qualification: new FormControl(null),
    course:this.fb.array([]),
    salaryRange: new FormControl(null),
    gender: new FormControl(null),
    displayDetails: new FormControl(null),
    searchTittle:new FormControl(null),
    searchbox: new FormControl(null),
    experiencefrom: new FormControl(null),
    experienceto: new FormControl(null),
    salary:this.fb.array([]),
    role: this.fb.array([]),
    department:this.fb.array([]),
    industry:this.fb.array([]),
    noticeperiod:this.fb.array([]),
    range:new FormControl(1),
    page:new FormControl(0),
  })
  folderForm:any = this.fb.group({
    folderName:new FormControl(null)

  })
  activeform:any = this.fb.group({
    active: new FormControl(true)
  })
  can_data: any;
  rcnt_data: any;
  is_icon: boolean = false;
  is_search_icon: boolean = true;
  is_canfolderlist :boolean = false;
  save_search_data: any;
  listArray:any=[];
  canid: any;
  course_list: any;
  is_new: boolean = false;
  is_old:boolean = true;
  folderName: any;
  folder_list: any;
  canfolderList: any;
  folder_name: any;
  data_list: any;
  createdAt: any;
  splitdata: any;
  depart_data: any;
  cat_data: any;
  role_data: any;
  depart_count:any = 5;
  role_count:any = 5;
  indus_data: any;
  searchArray: any;
  cityList: any;
  Tab=0;
  savedList: any;
  mailList: any;
  notes_can_id: any;
  comments: any;
  page = 0;
  range = 1;
  constructor(private empservice: EmpServiceService,private fb:FormBuilder, private router: Router,) { }
  is_viewpost : boolean = false;
  is_viewapplies : boolean = false;
  is_viewcan:boolean = true;
  is_icon1 = false;
  indus_count:any = 5
  ngOnInit(): void {
    this.getJobpostDetails()
    this.get_can()
    this.recent_search()
    this.get_save_search()
    this.get_course_list()
    this.get_folder_list()
    this.get_depart()
    this.cat()
    this.getall_indus()
    this.get_city()
  }
  getJobpostDetails(){
    this.empservice.myjobPost().subscribe((res:any)=>{
      this.data = res.user
      console.log(res.user);
    })
  }
  current_link(){
    this.Tab = 1;
    this.is_viewpost = true
    this.is_viewapplies = false
    this.is_viewcan = false
    this.is_canfolderlist = false
  }
  current_applies(id :any){
    console.log('current_applies',id);
    this.Tab = 2;
    this.is_viewapplies = true
    this.is_viewpost = false
    this.is_viewcan = false
    this.empservice.view_post(id).subscribe((res:any)=>{
      this.applied_data = res
      console.log(this.applied_data);
    })
  }
  view_post_details(){

  }
  can_list(){
    this.Tab=0;
    this.is_viewcan = true
    this.is_viewapplies = false
    this.is_viewpost = false
    this.is_icon = true
    this.is_search_icon = false
    this.is_icon = true
    this.is_canfolderlist = false
    this.search();
  }
  get_can(){
    this.empservice.view_can(this.searchForm.value).subscribe((res:any)=>{
      console.log(res);
     this.can_data = res.user.data
     console.log(this.can_data);

    })
  }
  search(){
    console.log('search',this.searchForm.value);
      // if(this.searchForm.get('keyskills')?.valid && this.searchForm.get('location')?.valid && this.searchForm.get('experience')?.valid){
        this.empservice.view_can(this.searchForm.value).subscribe((res:any)=>{
          console.log(res);
         this.can_data = res.user
         this.recent_search()
        //  this.searchForm.reset();
        })
      // }
  }

  search_skills(data:any){
    if (data.target.value) {
      this.isDisplay = true;
    } 
    else {
      this.isDisplay = false
    }
    this.getKeyskills(data.target.value)
  }
  getKeyskills(value: any) {
    this.empservice.getSkill(value).subscribe((res: any) => {
      this.keySkill = res;
      console.log(this.keySkill)
    })
  }
  checkSkill(event: any, skill: any) {
    console.log('checkSkill',skill);
    let index: any = this.searchForm.get('keyskills')?.value;
    console.log(index)
    console.log(this.searchForm.get('keyskills')?.value)
    if (index.length != 0) {
      let value = index.splice([index.length - 1], 1);
      index.push(skill)
      this.searchForm.get('keyskills')?.setValue(index);
      console.log( this.searchForm.get('keyskills')?.value)
      let search: any = index.toString() + ","
      this.searchForm.get('searchbox')?.setValue(search);
      this.isDisplay = false
      this.isDisplayad =false
    }
  }
  recent_search(){
    this.empservice.rcnt_search().subscribe((res: any) => {
      this.rcnt_data = res
      console.log(res);
    })
  }
  get_recnt_search(id:any){
    this.empservice.get_rcnt_search(id).subscribe((res: any) => {
      this.is_icon = true
      this.is_search_icon = false
      this.searchArray = res.keyskills
      this.searchForm.get('searchbox')?.setValue(this.searchArray);
      console.log(res.keyskills)
      this.searchForm.patchValue({
        Location: res.location,
        experience: res.experience
      })
    })
  }
  save_search(){
      this.is_icon1 = true;
      this.is_icon = false;
      this.is_search_icon = false;
      this.empservice.save_search(this.searchForm.value).subscribe((res:any)=>{
        console.log(res)
        this.get_save_search();
      })
  }
 get_save_search(){
  this.empservice.get_save_search().subscribe((res:any)=>{
    console.log(res)
    this.save_search_data = res
  })
 }
 change_status(id:any,e:any){
  console.log(id,e.target.checked)
  this.empservice.change_status(id,this.activeform.value).subscribe((res:any)=>{
    this.getJobpostDetails()
    console.log(res)
  })
 }
 canId(event:any){
    if (event.target.checked) {
      this.listArray.push(event.target.value);
    } else {
      let i: number = 0;
      this.listArray.forEach((item: any) => {
        if (item == event.target.value) {
          this.listArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.listArray)
   
 }
 send(id:any){
  var data: any ={
    mailId:id,
    candidates:this.listArray
  }
  var queryString = new URLSearchParams(data).toString();
  this.router.navigateByUrl('/can-details?'+queryString);

 }
 get_course_list(){
  this.empservice.get_course_list().subscribe((res:any)=>{
    this.course_list = res
    console.log(res)
  })
 }
advanced_search(){
   if(this.searchForm.get('anykeywords')?.valid && this.searchForm.get('Location')?.valid && this.searchForm.get('experiencefrom')?.valid && this.searchForm.get('experienceto')?.valid && this.searchForm.get('salaryRange')?.valid && this.searchForm.get('gender')?.valid && this.searchForm.get('course')?.valid && this.searchForm.get('displayDetails')?.valid){
  this.empservice.view_can(this.searchForm.value).subscribe((res:any)=>{
    console.log(res);
    this.search()
  })
}
}
pushCourse(e:any){
  const data: FormArray = this.searchForm.get('course') as FormArray;
  console.log(e)
  data.push(new FormControl(e.Course))
}
save_folder(){
   this.is_new = true;
   this.is_old = false;
}
create_new_folder(){
  var data={
    candidateId:this.listArray,
    folderName:this.folderForm.get('folderName').value
  }
  console.log(data)
  this.empservice.create_folder(data).subscribe((res:any)=>{
    this.folderForm.reset();
    console.log(res);
  })
}
exis_fold(){
  this.is_new = false;
   this.is_old = true;
}
get_folder_list(){
  this.empservice.get_folder_list().subscribe((res:any)=>{
    console.log(res);
   this.folder_list = res.user
  })
}
get_folder_details(id:any,folderName:any){
  console.log(id,folderName)
  var data={
    id : id,
    folderName:folderName
  }
  this.empservice.get_folder_details(data).subscribe((res:any)=>{
    console.log(res);
    this.canfolderList = res
    this.folder_name = this.canfolderList[0].folderName
    this.createdAt = this.canfolderList[0].createdAt
    
    this.splitdata = this.createdAt.split("T")
    console.log(this.splitdata[0])

    this.is_canfolderlist = true
    this.is_viewcan = false
    this.is_viewapplies = false
    this.is_viewpost = false
  })
}
get_qualification(list:any){
  console.log(list)
   if(list.drQualification == 'Doctorate/phD'){
    return list.drcourses + ' ' + list.drSpecialization
  }
  else if(list.pgQualification == 'Masters/Post-Graduation'){
    return list.pgCourse + ' ' + list.pgSpecialization
  }
  else if(list.ugQualification == 'Graduation/Diploma'){
    return list.ugCourse + ' ' + list.ugSpecialization
  }
  else if(list.hsQualification == 'HSC'){
    return list.hsQualification
  }
  else{
    return list.sslcQualification
  }
  
}
get_appliedcan_qualification(list:any){
  console.log(list)
  this.data_list = list.candidateData
  if(this.data_list.drQualification == 'Doctorate/phD'){
    return this.data_list.drcourses + ' ' + this.data_list.drSpecialization
  }
  else if(this.data_list.pgQualification == 'Masters/Post-Graduation'){
    return this.data_list.pgCourse + ' ' + this.data_list.pgSpecialization
  }
  else if(this.data_list.ugQualification == 'Graduation/Diploma'){
    return this.data_list.ugCourse + ' ' + this.data_list.ugSpecialization
  }
  else if(this.data_list.hsQualification == 'HSC'){
    return this.data_list.hsQualification
  }
  else{
    return this.data_list.sslcQualification
  }
  
}
get_appliedcanall_qualification(list:any){
  this.data_list = list?.candidateDetail[0]
  if(this.data_list.drQualification == 'Doctorate/phD'){
    return this.data_list.drcourses + ' ' + this.data_list.drSpecialization
  }
  else if(this.data_list.pgQualification == 'Masters/Post-Graduation'){
    return this.data_list.pgCourse + ' ' + this.data_list.pgSpecialization
  }
  else if(this.data_list.ugQualification == 'Graduation/Diploma'){
    return this.data_list.ugCourse + ' ' + this.data_list.ugSpecialization
  }
  else if(this.data_list.hsQualification == 'HSC'){
    return this.data_list.hsQualification
  }
  else{
    return this.data_list.sslcQualification
  }
}
get_qua_list(list:any){
  console.log()
  this.data_list = list.candidateDetails
  if(this.data_list.drQualification == 'Doctorate/phD'){
    return this.data_list.drcourses + ' ' + this.data_list.drSpecialization
  }
  else if(this.data_list.pgQualification == 'Masters/Post-Graduation'){
    return this.data_list.pgCourse + ' ' + this.data_list.pgSpecialization
  }
  else if(this.data_list.ugQualification == 'Graduation/Diploma'){
    return this.data_list.ugCourse + ' ' + this.data_list.ugSpecialization
  }
  else if(this.data_list.hsQualification == 'HSC'){
    return this.data_list.hsQualification
  }
  else{
    return this.data_list.sslcQualification
  }
}
sendmail(){
  var data: any ={
    candidates:this.listArray
  }
  var queryString = new URLSearchParams(data).toString();
  this.router.navigateByUrl('/sendMail?'+queryString);
}
sendjob(){
  var data: any ={
    candidates:this.listArray
  }
  var queryString = new URLSearchParams(data).toString();
  this.router.navigateByUrl('/sendJob?'+queryString);
}
dispalye(data: any) {
  console.log("lusu")
  let value = data.target.value.split(",");
  if (data.target.value) {
    this.isDisplay = true;
  } else {
    this.isDisplay = false
  }
  if (value.length != 0) {
    if (value[value.length - 1] != null && value[value.length - 1] != '') {
      this.getKeyskills(value[value.length - 1])
    }
  }
  console.log(value)

  this.searchForm.get('keyskills')?.setValue(value)
  console.log("fgvfdg", this.searchForm.get('keyskills')?.value)

}
dispalyead(data: any) {
  console.log("lusu")
  let value = data.target.value.split(",");
  if (data.target.value) {
    this.isDisplayad = true;
  } else {
    this.isDisplayad = false
  }
  if (value.length != 0) {
    if (value[value.length - 1] != null && value[value.length - 1] != '') {
      this.getKeyskills(value[value.length - 1])
    }
  }
  console.log(value)

  this.searchForm.get('keyskills')?.setValue(value)
  console.log("fgvfdg", this.searchForm.get('keyskills')?.value)

}
get_depart(){
  
  this.empservice.get_department_search(this.depart_count).subscribe((res:any) => {
    console.log(res);
    this.depart_data = res
  })
}
viewall_depart(count:any){

  this.empservice.get_department_search(count).subscribe((res:any) => {
    console.log(res);
    this.depart_data = res
  })
}
cat(){
  this.empservice.get_roles(this.role_count).subscribe((res:any) => {
    console.log(res);
    this.role_data = res
  })
}
viewall_role(count:any){
  this.empservice.get_roles(count).subscribe((res:any) => {
    console.log(res);
    this.role_data = res
  })
}
getall_indus(){
  this.empservice.get_industry_search(this.indus_count).subscribe((res:any) => {
    console.log(res);
    this.indus_data = res
})
}
viewall_indus(count:any){
  this.empservice.get_industry_search(count).subscribe((res:any) => {
    console.log(res);
    this.indus_data = res
  })
}
viewall_city(count:any){

}
filterrole(e:any){
  const data = this.searchForm.get('role')?.value;
  if(e.target.checked){
    console.log(e.target.value)
    data.push(e.target.value)
  }
  else{
    let i: number = 0;
    data.forEach((item: any) => {
      if (item == e.target.value) {
        data.splice(i,1);
        return;
      }
      i++;
    });
  }
 
}
filterdepart(e:any){
  const data1 = this.searchForm.get('department')?.value;
  if(e.target.checked){
    console.log(e.target.value)
    data1.push(e.target.value)
  }
  else{
    let i: number = 0;
    data1.forEach((item: any) => {
      if (item == e.target.value) {
        data1.splice(i,1);
        return;
      }
      i++;
    });
    
  }

}
filterindus(e:any){
  const data2 = this.searchForm.get('industry')?.value;
  if(e.target.checked){
    console.log(e.target.value)
    data2.push(e.target.value)
  }
  else{
    let i: number = 0;
    data2.forEach((item: any) => {
      if (item == e.target.value) {
        data2.splice(i,1);
        return;
      }
      i++;
    });
    
  }

}
filterlocation(e:any){
  const data = this.searchForm.get('Location')?.value;
  if(e.target.checked){
    console.log(e.target.value)
    data.push(e.target.value)
  }
  else{
    let i: number = 0;
    data.forEach((item: any) => {
      if (item == e.target.value) {
        data.splice(i,1);
        return;
      }
      i++;
    });
  }
  console.log(data)
}
filternotice(e:any){
  const data = this.searchForm.get('noticeperiod')?.value;
  if(e.target.checked){
    console.log(e.target.value)
    data.push(e.target.value)
  }
  else{
    let i: number = 0;
    data.forEach((item: any) => {
      if (item == e.target.value) {
        data.splice(i,1);
        return;
      }
      i++;
    });
  }
  console.log(data)
}
filtersalary(e:any){
  const data = this.searchForm.get('salary')?.value;
  if(e.target.checked){
    console.log(e.target.value)
    data.push(e.target.value)
  }
  else{
    let i: number = 0;
    data.forEach((item: any) => {
      if (item == e.target.value) {
        data.splice(i,1);
        return;
      }
      i++;
    });
  }

}
get_city(){
  this.empservice.get_city().subscribe((res:any)=>{
    console.log(res);
    this.cityList = res
  })
}
edit_jobpost(id:any){
  const queryString = new URLSearchParams(id).toString()
  this.router.navigateByUrl('/edit-jobpost?id=' + queryString)
}

viewsaved_can(){
  this.Tab = 3
  this.range = 5
  this.page =0
  this.getsaved_can()
}
getsaved_can(){
  this.empservice.getall_saved_candidates(this.range,this.page).subscribe((res:any)=>{
    console.log(res);
    this.savedList = res.data
  })
}
notify(){
  this.Tab =5
  this.range = 5
  this.page =0
  this.empservice.get_mail_notification(this.range,this.page).subscribe((res:any)=>{
    console.log(res);
    this.mailList = res.data
  })
}
autoGrowTextZone(e:any) {
  e.target.style.height = "0px";
  e.target.style.height = (e.target.scrollHeight + 25)+"px";
}
getcanid_notes(id:any,comment:any){
   this.notes_can_id = id
   console.log(this.notes_can_id,this.comments)
}
submitNotes(){
  var data={
    candidateId:this.notes_can_id,
    comment:this.notesForm.get('comment')?.value
  }
  this.empservice.notes(data).subscribe((res:any)=>{
    console.log(res);
    this.notesForm.reset()
    this.notify()
  })
}
clkrange(count:any){

}
}