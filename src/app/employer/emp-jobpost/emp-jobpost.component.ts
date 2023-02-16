import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-jobpost',
  templateUrl: './emp-jobpost.component.html',
  styleUrls: ['./emp-jobpost.component.css']
})
export class EmpJobpostComponent implements OnInit {
  isDisplay = false
  checkedList : any=[];
  jobpostForm:any = this.formBuilder.group({
    jobTittle : new FormControl('', Validators.required),
    contactNumber : new FormControl('', Validators.required),
    jobDescription : new FormControl('', Validators.required),
    keySkill : this.formBuilder.array([], Validators.required),
    educationalQualification : new FormControl('', Validators.required),
    salaryRangeFrom : new FormControl('', Validators.required),
    salaryRangeTo : new FormControl('', Validators.required),
    experienceFrom : new FormControl('', Validators.required),
    experienceTo : new FormControl('', Validators.required),
    interviewType : new FormControl(null, Validators.required),
    candidateDescription : new FormControl('', Validators.required),
    salaryDescription : new FormControl('', Validators.required),
    urltoApply : new FormControl('', Validators.required),
    workplaceType : new FormControl(null, Validators.required),
    industry : new FormControl(null, Validators.required),
    preferedIndustry : this.formBuilder.array([], Validators.required),
    jobLocation : new FormControl('', Validators.required),
    employmentType : new FormControl(null, Validators.required),
    openings : new FormControl('', Validators.required),
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
    specialization:this.formBuilder.array([], Validators.required)
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
  constructor(private formBuilder:FormBuilder,private router: Router,private empservice: EmpServiceService) { }

  ngOnInit(): void {
    this.get_industry_list()
    this.get_depart()
    this.get_qualification()
  }
  job_post(){
    this.empservice.submitPostAJob(this.jobpostForm.value).subscribe((res:any)=>{
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
  cat(data: any){
    this.empservice.get_role(data.target.value).subscribe((res:any) => {
      console.log(res);
      this.role_data = res
    })
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
    this.jobpostForm.get('keySkill')?.setValue(value)
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
    data.push(new FormControl(e.Industry))
  }
  get_qualification(){
    this.empservice.get_qualification().subscribe((res:any) => {
      console.log(res);
      this.qua_data = res
    })
  }
  putcourse(e:any){
    const data: FormArray = this.jobpostForm.get('qualification') as FormArray;
    console.log(e)
    data.push(new FormControl(e._id))
    this.pushdata = data
    console.log(data)
    this.empservice.get_courses({arr:this.pushdata.value}).subscribe((res:any) => {
      this.coursedata = res
      console.log(res)
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
}
