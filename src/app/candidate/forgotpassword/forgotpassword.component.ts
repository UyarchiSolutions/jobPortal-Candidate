import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  sendOtpFom:any=this.fb.group({
    mobilenumber:new FormControl('', Validators.required)
  })
  constructor(private router:Router,private fb:FormBuilder,private candidate:CanditateService) { }

  ngOnInit(): void {
  }
  sendOtp(){
    this.candidate.sendmodile(this.sendOtpFom.value).subscribe((res:any) => {
      this.router.navigate(['/sendOtp'],{queryParams:{mobile:this.sendOtpFom.get('mobilenumber')?.value}})

    })
  }
}
