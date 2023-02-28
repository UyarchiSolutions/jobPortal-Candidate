import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-edit-jobpost',
  templateUrl: './edit-jobpost.component.html',
  styleUrls: ['./edit-jobpost.component.css']
})
export class EditJobpostComponent implements OnInit {
  isDisplay = false
  checkedList : any=[];
  jobpostForm:any = this.formBuilder.group({
    jobTittle : new FormControl('', Validators.required),
    contactNumber : new FormControl('', Validators.required),
    jobDescription : new FormControl('', Validators.required),
    keySkill :  new FormControl([], Validators.required),
    educationalQualification : new FormControl('', Validators.required),
    salaryRangeFrom : new FormControl(''),
    salaryRangeTo : new FormControl(''),
    experienceFrom : new FormControl('', Validators.required),
    experienceTo : new FormControl('', Validators.required),
    interviewType : new FormControl(null, Validators.required),
    candidateDescription : new FormControl('', Validators.required),
    salaryDescription : new FormControl(''),
    urltoApply : new FormControl(''),
    workplaceType : new FormControl(null, Validators.required),
    industry : new FormControl(null, Validators.required),
    preferedIndustry : this.formBuilder.array([], Validators.required),
    jobLocation : new FormControl('', Validators.required),
    employmentType : new FormControl(null, Validators.required),
    openings : new FormControl(''),
    department: new FormControl(null, Validators.required),
    roleCategory: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    interviewstartDate: new FormControl(null, Validators.required),
    interviewendDate: new FormControl(null, Validators.required),
    startTime: new FormControl(null, Validators.required),
    endTime: new FormControl(null, Validators.required),
    recruiterName:new FormControl(null, Validators.required),
    recruiterEmail:new FormControl(null, Validators.required),
    recruiterNumber:new FormControl(null, Validators.required),
    qualification:this.formBuilder.array([], Validators.required),
    course:this.formBuilder.array([], Validators.required),
    specialization:this.formBuilder.array([], Validators.required),
    searchbox: new FormControl(null),
    
  });
  keySkill: any;
  latitude:any;
  longtitude:any;
  indus_data: any;
  depart_data: any;
  cat_data:any;
  role_data: any;
  is_new: boolean =false;
  is_list: boolean=false;
 
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'Industry',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  dropdownSettings1: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'qualification',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  dropdownSettings2: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'Course',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  dropdownSettings3: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'Specialization',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  qua_data: any;
  pushdata:any;
  coursedata: any;
  spcldata: any;
  courseid: any;
  coursename: any;
  is_open: boolean = false;
  quaid: any;
  is_course: boolean = false;
  quaname: any;
  educationArray:any=[
   
  ];
  spclname: any;
  pushdata1:any;
  pushdatac:any;
  pushdatacs:any;
  list:any;
  postid: any;
  jobdetails: any;
  Tab=0;
  apply_method: any;
  roledata: any;
  quadata: any;
  depdata: any;
  inddata: any;
  constructor(private formBuilder:FormBuilder,private router: Router,private empservice: EmpServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params['id']); 
      this.postid=params['id'];
    }
  );


    this.get_industry_list()
    this.get_depart()
    this.get_qualification()
    this.get()
    this.get_jobpost_detail(this.postid)
  }
  get_jobpost_detail(postid: any){
    this.empservice.get_job_detail(postid).subscribe((res:any)=>{
      console.log(res);
      this.jobdetails = res.user[0]
      this.jobpostForm.patchValue({
        jobTittle : this.jobdetails.jobTittle,
        contactNumber : this.jobdetails.contactNumber,
        jobDescription : this.jobdetails.jobDescription,
        keySkill :  this.jobdetails.keySkill,
        salaryRangeFrom : this.jobdetails.salaryRangeFrom,
        salaryRangeTo : this.jobdetails.salaryRangeTo,
        experienceFrom : this.jobdetails.experienceFrom,
        experienceTo : this.jobdetails.experienceTo,
        interviewType : this.jobdetails.interviewType,
        candidateDescription : this.jobdetails.candidateDescription,
        salaryDescription : this.jobdetails.salaryDescription,
        urltoApply : this.jobdetails.urltoApply,
        workplaceType : this.jobdetails.workplaceType,
        industry : this.jobdetails.industry,
        preferedIndustry : this.jobdetails.preferedIndustry,
        jobLocation : this.jobdetails.jobLocation,
        employmentType : this.jobdetails.employmentType,
        openings : this.jobdetails.openings,
        department: this.jobdetails.department,
        roleCategory: this.jobdetails.roleCategory,
        role: this.jobdetails.role,
        interviewstartDate: this.jobdetails.interviewstartDate,
        interviewendDate: this.jobdetails.interviewendDate,
        startTime: this.jobdetails.startTime,
        endTime: this.jobdetails.endTime,
        recruiterName:this.jobdetails.recruiterName,
        recruiterEmail:this.jobdetails.recruiterEmail,
        recruiterNumber:this.jobdetails.recruiterNumber,
        qualification:this.jobdetails.qualification,
        course:this.jobdetails.course,
        specialization:this.jobdetails.specialization,
        searchbox:this.jobdetails.keySkill,
        apply_method:new FormControl(null,Validators.required),
        recruiterList:new FormControl(null,Validators.required),
        recruiterList1:new FormControl(null,Validators.required),
      });
      if(this.jobdetails.recruiterName && this.jobdetails.recruiterEmail && this.jobdetails.recruiterNumber){
        this.is_new = true
      }
      if(this.jobdetails.department){
        this.rolecategorybind()
      }
    })
    
  }
  checkradio(data:any){

    if(this.jobdetails.recruiterName && this.jobdetails.recruiterEmail && this.jobdetails.recruiterNumber){
      if(data == 'new'){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      if(data == 'list'){
        return true;
      }
      else{
        return false;
      }
    }
  }
  choose_apply(e:any){
    this.apply_method = e.target.value
    console.log(this.apply_method)
}
  job_post(){
    this.empservice.updatePostAJob(this.postid,this.jobpostForm.value).subscribe((res:any)=>{
      console.log(res);
      this.jobpostForm.reset();
      if(res){
      }
    })
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
    })
  }
  checkSkill(event: any, skill: any) {
    console.log('checkSkill',skill);
    let index: any = this.jobpostForm.get('keySkill')?.value;
    if (index.length != 0) {
      let value = index.splice([index.length - 1], 1);
      index.push(skill.Skill_Title)
      this.jobpostForm.get('keySkill')?.setValue(index)
      let search: any = index.toString() + ","
      this.jobpostForm.get('searchbox')?.setValue(search);
      this.isDisplay =false
      console.log(this.jobpostForm.get('searchbox')?.value)
    }
  }
  options: any = {
    componentRestrictions: { country: 'IN' },
  };
  handleAddressChange(address: Address) {
    console.log(address);
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    this.latitude = address.geometry.location.lat();
    this.longtitude = address.geometry.location.lng();
    this.jobpostForm.patchValue({
      jobLocation:address.formatted_address
    })
  }
  get_industry_list(){
    this.empservice.get_industry().subscribe((res:any) => {
      console.log(res);
      this.indus_data = res
      // console.log(this.)
    })
  }
  get_depart(){
    this.empservice.get_department().subscribe((res:any) => {
      console.log(res);
      this.depart_data = res
    })
  }
  depart(data: any){
    this.empservice.get_category(data.target.value).subscribe((res:any) => {
      console.log(res);
      this.cat_data = res
    })
  }
  rolecategorybind(){
    this.empservice.get_category(this.jobdetails.department).subscribe((res:any) => {
      console.log(res);
      this.cat_data = res
      this.rolebind()
    })
  }
  rolebind(){
    this.empservice.get_role(this.jobdetails.roleCategory).subscribe((res:any) => {
      console.log(res);
      this.role_data = res
    })
  }
  cat(data: any){
    this.empservice.get_role(data.target.value).subscribe((res:any) => {
      console.log(res);
      this.role_data = res
    })
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
    this.jobpostForm.get('keySkill')?.setValue(value)
    console.log(this.jobpostForm.get('keySkill')?.value)
  }
  recriterlist(e:any){
   console.log(e.target.value)
   if(e.target.value == 'list'){
        this.is_list = true;
        this.is_new = false;
   }
   else{
        this.is_new = true;
        this.is_list = false;
   }
  }
  pushCourse(e:any){
    const data: FormArray = this.jobpostForm.get('preferedIndustry') as FormArray;
    console.log(e)
    data.push(new FormControl(e._id))
  }
  get_qualification(){
    this.empservice.get_qualification().subscribe((res:any) => {
      console.log(res);
      this.qua_data = res
    })
  }
  
  DeSelect_putcourse(e:any){
    console.log(e)
    let i: number = 0;
    this.pushdata.forEach((item: any) => {
      if (item == e._id) {
        this.pushdata.removeAt(i);
        return;
      }
      i++;
    });
    this.empservice.get_courses({arr:this.pushdata.value}).subscribe((res:any) => {
      console.log(res)
    })
  }
  putspecial(e:any){
    const data: FormArray = this.jobpostForm.get('course') as FormArray;
    console.log(e)
    data.push(new FormControl(e._id))
    this.spcldata = data
    console.log(data)
    this.empservice.get_specialization({arr:this.spcldata.value}).subscribe((res:any) => {
      this.spcldata = res
      console.log(res)
    })
  }
  put(e:any){

  }
  selectqualificaion(e:any,event:any){
    console.log(event.target.checked)
    if(event.target.checked){
      const data: FormArray = this.jobpostForm.get('qualification') as FormArray;
      data.push(new FormControl(e._id))
      this.pushdata = data
      this.quaid = Array(e._id)
      this.quaname = e.qualification
      console.log("fd",this.quaid,this.quaname)
      this.empservice.get_courses({arr:this.quaid}).subscribe((res:any) => {
        this.coursedata = res[0].allCourses
        this.is_course = true
        console.log(this.coursedata)
      })
    }
    else{
      this.is_course = false
      let i: number = 0;
      this.pushdata.forEach((item: any) => {
        if (item == e._id) {
          this.pushdata.removeAt(i);
          return;
        }
        i++;
      });
    }
    
  }
  selectcourse(e:any,event:any){
    console.log(e)
    this.courseid = Array(e._id)
    this.coursename = e.Course
    if(event.target.checked){
      const data: FormArray = this.jobpostForm.get('course') as FormArray;
      data.push(new FormControl(e._id))
      this.pushdatac = data
      this.empservice.get_specialization({arr:this.courseid}).subscribe((res:any) => {
      this.spcldata = res
      this.is_open = true
      console.log(res)
      })
    }
    else{
      this.is_open = false
      let i: number = 0;
      this.educationArray.forEach((item: any) => {
        if (item.coursename == this.coursename) {
          this.educationArray.splice(i);
          return;
        }
        i++;
      });

      this.pushdatac.forEach((item: any) => {
        if (item == e._id) {
          this.pushdatac.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.educationArray)
   
  }
  selectspcl(e:any,event:any){
    this.spclname = e.Specialization
    
    if(event.target.checked){
      this.educationArray.push(
        {
          coursename:this.coursename,
          spclname: this.spclname
        }
      )
      const data: FormArray = this.jobpostForm.get('specialization') as FormArray;
      data.push(new FormControl(e._id))
      this.pushdatacs = data
    }
    else{
      const filteredPeople = this.educationArray.findIndex((item:any) => item.spclname == this.spclname);
      console.log(filteredPeople)
      this.educationArray.splice(filteredPeople,1);
      console.log(this.educationArray)

      let i: number = 0;
      this.pushdatacs.forEach((item: any) => {
        if (item == e._id) {
          this.pushdatacs.removeAt(i);
          return;
        }
        i++;
      });
    }
    
  }
  rem(data:any){
    console.log(data)
    const filteredPeople = this.educationArray.findIndex((item:any) => item.coursename == data.coursename &&  item.spclname == data.spclname);
    console.log(filteredPeople)
    this.educationArray.splice(filteredPeople,1);
    console.log(this.educationArray)
  }
  isChecke(data: any) {
    if (this.educationArray.find((a: any) => a.spclname == data)) {
      return true;
    } else {
      return false;
    }
  }
  get(){
    this.empservice.get_recruiter().subscribe((data) =>{
      console.log(data)
      this.list = data
    })
  }
  changerecruiter(data:any){
    console.log(data.target.value)
    this.empservice.getdetails_recruiter(data.target.value).subscribe((data:any) =>{
      this.jobpostForm.patchValue({
        recruiterName:data.recruiterName,
        recruiterEmail:data.email,
        recruiterNumber:data.mobileNumber
      })
    })
  }
  test(){
    this.Tab = 1
  }
  pre(){
    // this.Tab = 1
    let index = this.role_data.findIndex((r: any) => r._id === this.jobpostForm.get('role')?.value)
    this.roledata = this.role_data[index].Job_role
    console.log(this.roledata)
    let index1 = this.qua_data.findIndex((r: any) => r._id === this.jobpostForm.get('qualification')?.value)
    this.quadata = this.qua_data[index1].qualification
    let index2 = this.depart_data.findIndex((r: any) => r._id === this.jobpostForm.get('department')?.value)
    this.depdata = this.depart_data[index2].Department
    let index3 = this.indus_data.findIndex((r: any) => r._id === this.jobpostForm.get('preferedIndustry')?.value)
    this.inddata = this.indus_data[index3].Industry
  }
}
