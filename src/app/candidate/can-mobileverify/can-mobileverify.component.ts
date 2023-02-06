import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-can-mobileverify',
  templateUrl: './can-mobileverify.component.html',
  styleUrls: ['./can-mobileverify.component.css']
})
export class CanMobileverifyComponent implements OnInit {
  mobileOtp: any;
  verify = this.fb.group({
    otp: new FormControl('', Validators.required),
    mobilenumber: new FormControl('', Validators.required)

  });
  constructor(private canditateService: CanditateService, private activateRoute: ActivatedRoute, private fb: FormBuilder,private router:Router) { }
  ngOnInit() {
    this.activateRoute.queryParams.subscribe((res: any) => {
      this.mobileOtp = res.mobilenumber;
      this.mobilenumberFns(this.mobileOtp);
    })
  }
  // sent OTP for
  mobilenumberFns(mobile: any) {
    const a = {
      mobilenumber: mobile
    }
    this.canditateService.verifyMobile(a).subscribe((res: any) => {
    })
  }
  verify_now() {
    this.verify.patchValue({
      mobilenumber: this.mobileOtp
    });
    this.canditateService.verify_otp(this.verify.value).subscribe((res: any) => {
      this.router.navigate(['canlogin']);
    }
    );
  }
}
