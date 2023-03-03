import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-mobileverification',
  templateUrl: './mobileverification.component.html',
  styleUrls: ['./mobileverification.component.css']
})
export class MobileverificationComponent implements OnInit {
  mobileForm:any=this.fb.group({
    otp:new FormControl('',Validators.required),
    mobileNumber:new FormControl('')
  })
  constructor(private candidateService:CanditateService,private fb: FormBuilder,private router:Router,private activatRouter:ActivatedRoute) { }

  ngOnInit() {
    this.activatRouter.queryParams.subscribe((res:Params) => {
      this.mobileForm.patchValue({
        mobileNumber:res['mobileNumber']
      })
      console.log(res['mobileNumber'])
    })
  }
  submitted(){
    this.candidateService.verifiedMobile(this.mobileForm.value).subscribe((res:any) => {
      this.router.navigate(['/getAllprofile'],{queryParams:{taps:10}})
    })
  }
}
