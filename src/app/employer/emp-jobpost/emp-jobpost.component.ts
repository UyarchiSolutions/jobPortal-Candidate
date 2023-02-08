import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-jobpost',
  templateUrl: './emp-jobpost.component.html',
  styleUrls: ['./emp-jobpost.component.css']
})
export class EmpJobpostComponent implements OnInit {
  jobpostForm = this.formBuilder.group({
    jobTittle : new FormControl('', Validators.required),
    recruiterName : new FormControl('', Validators.required),
    contactNumber : new FormControl('', Validators.required),
    jobDescription : new FormControl('', Validators.required),
    keySkill : new FormControl('', Validators.required),
    educationalQualification : new FormControl('', Validators.required),
    salaryRangeFrom : new FormControl('', Validators.required),
    salaryRangeTo : new FormControl('', Validators.required),
    experienceFrom : new FormControl('', Validators.required),
    experienceTo : new FormControl('', Validators.required),
    interviewType : new FormControl('', Validators.required),
    candidateDescription : new FormControl('', Validators.required),
    salaryDescription : new FormControl('', Validators.required),
    urltoApply : new FormControl('', Validators.required),
    workplaceType : new FormControl('', Validators.required),
    industry : new FormControl('', Validators.required),
    preferedIndustry : new FormControl('', Validators.required),
    jobLocation : new FormControl('', Validators.required),
    employmentType : new FormControl('', Validators.required),
    openings : new FormControl('', Validators.required),
  });

  constructor(private formBuilder:FormBuilder,private router: Router,private empservice: EmpServiceService) { }

  ngOnInit(): void {
  }
  job_post(){
    this.empservice.submitPostAJob(this.jobpostForm.value).subscribe((res:any)=>{
      console.log(res);
      if(res){
      }
    })
    this.jobpostForm.reset();

  }
}
