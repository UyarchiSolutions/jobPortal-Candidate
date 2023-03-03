import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
  otpForm:any=this.fb.group({
    email:new FormControl(''),
    otp:new FormControl('',Validators.required),
  })
  constructor(private candidateService:CanditateService,private fb: FormBuilder,private router:Router,private activatRouter:ActivatedRoute) { }

  ngOnInit() {
    this.activatRouter.queryParams.subscribe((res:Params) =>{
      console.log(res['mail']);
      this.otpForm.patchValue({
        email:res['mail'],
      })
    })
  }
  submitted(){
    this.candidateService.verifiedMail(this.otpForm.value).subscribe((res:any) => {
     this.router.navigate(['/getAllprofile'],{queryParams:{taps:10}})
    })
  }
}
