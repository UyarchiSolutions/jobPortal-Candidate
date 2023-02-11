import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
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
    recruiterName : new FormControl('', Validators.required),
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
    preferedIndustry : new FormControl(null, Validators.required),
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
  });
  keySkill: any;
  latitude:any;
  longtitude:any;
  indus_data: any;
  depart_data: any;
  cat_data:any;
  role_data: any;
  
  constructor(private formBuilder:FormBuilder,private router: Router,private empservice: EmpServiceService) { }

  ngOnInit(): void {
    this.get_industry_list()
    this.get_depart()
  }
  job_post(){
    this.empservice.submitPostAJob(this.jobpostForm.value).subscribe((res:any)=>{
      console.log(res);
      if(res){
      }
    })
    this.jobpostForm.reset();

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
  checkSkill(event:any){
    const data: FormArray = this.jobpostForm.get('keySkill') as FormArray;
    if (event.target.checked) {
      data.push(new FormControl(event.target.value));
      console.log(data)
    } else {
      let i: number = 0;
      data.controls.forEach((item: any) => {
        if (item == event.target.value) {
          data.removeAt(i);
          return;
        }
        i++;
      });
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
}
