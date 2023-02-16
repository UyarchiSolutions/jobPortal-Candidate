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
  searchForm: any = this.fb.group({
    keyskills: this.fb.array([]),
    location: new FormControl(null),
    anykeywords: new FormControl(null),
    experiencefrom: new FormControl(null),
    experienceto: new FormControl(null),
    experience: new FormControl(null),
    qualification: new FormControl(null),
    course:this.fb.array([]),
    salaryRange: new FormControl(null),
    gender: new FormControl(null),
    displayDetails: new FormControl(null),
    searchTittle:new FormControl(null),
    searchbox: new FormControl(null),
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
  constructor(private empservice: EmpServiceService,private fb:FormBuilder, private router: Router,) { }
  is_viewpost : boolean = false;
  is_viewapplies : boolean = false;
  is_viewcan:boolean = true;
  is_icon1 = false;
  ngOnInit(): void {
    this.getJobpostDetails()
    this.get_can()
    this.recent_search()
    this.get_save_search()
    this.get_course_list()
    this.get_folder_list()
  }
  getJobpostDetails(){
    this.empservice.myjobPost().subscribe((res:any)=>{
      this.data = res.user
      console.log(res.user);
    })
  }
  current_link(){
    this.is_viewpost = true
    this.is_viewapplies = false
    this.is_viewcan = false
    this.is_canfolderlist = false
  }
  current_applies(id :any){
    console.log('current_applies',id);
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
     this.can_data = res.user
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
    console.log(this.searchForm.get('keyskills')?.value)
    if (index.length != 0) {
      let value = index.splice([index.length - 1], 1);
      index.push(skill)
      this.searchForm.get('keyskills')?.setValue(index);
      console.log( this.searchForm.get('keyskills')?.value)
      let search: any = index.toString() + ","
      this.searchForm.get('searchbox')?.setValue(search);
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
      console.log(res.keyskills)
      this.searchForm.patchValue({
        location: res.location,
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
   if(this.searchForm.get('anykeywords')?.valid && this.searchForm.get('location')?.valid && this.searchForm.get('experiencefrom')?.valid && this.searchForm.get('experienceto')?.valid && this.searchForm.get('salaryRange')?.valid && this.searchForm.get('gender')?.valid && this.searchForm.get('course')?.valid && this.searchForm.get('displayDetails')?.valid){
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
  console.log(value)
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
  this.searchForm.get('keyskills')?.setValue(value)

}
}