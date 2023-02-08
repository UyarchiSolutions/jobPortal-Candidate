import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  verify = this.formBuilder.group({
    otp: new FormControl('', Validators.required),
    mobilenumber: new FormControl('', Validators.required)
  });
  mobile: any;
  lengthcheck: any = 0;

  constructor(private formBuilder:FormBuilder,private router: Router,private empservice: EmpServiceService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((res: any) => {
      this.mobile = res.mobilenumber;
      this.mobilenumberFns(this.mobile);
    });
  }
  mobilenumberFns(mobile:any){
    const a={
      mobilenumber:mobile
    }
   console.log(a,"huhdsd")
    this.empservice.verifyMobile(a).subscribe((res:any)=>{
    })
  }

  verify_now() {
    this.verify.patchValue({
      mobilenumber: this.mobile,
    });
    this.lengthcheck = this.verify.get('otp')?.valid ? this.verify.get('otp')?.value : 0;
      this.empservice.verify_otp(this.verify.value).subscribe((res: any) => {
          this.router.navigate(['login']);
        }
      );
  }
}
