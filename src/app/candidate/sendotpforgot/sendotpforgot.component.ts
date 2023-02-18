import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-sendotpforgot',
  templateUrl: './sendotpforgot.component.html',
  styleUrls: ['./sendotpforgot.component.css']
})
export class SendotpforgotComponent implements OnInit {
  otpForm=this.fb.group({
    mobilenumber:new FormControl(''),
    otp:new FormControl('')
  })
  constructor(private router:Router,private candidateservice:CanditateService,private fb:FormBuilder,private activate:ActivatedRoute) { }

  ngOnInit(): void {
    this.activate.queryParams.subscribe((res:any) =>{
      this.otpForm.patchValue({
        mobilenumber:res['mobile'],
      })
    })
  }
  // newPAss'
  verifyOtp(){
    this.candidateservice.sendOTp(this.otpForm.value).subscribe((res:any) => {
      this.router.navigate(['/newPAss'],{queryParams:{id:res.id}})
    })

  }
}
