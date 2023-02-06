import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  file:any

  constructor(private formBuilder: FormBuilder, private router: Router,private empservice: EmpServiceService) {

   }
   RegisterForm:any = this.formBuilder.group({
    logo: new FormControl(''),
    company_name : new FormControl('',[
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    email: new FormControl(''),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    mobileNumber: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    contactName: new FormControl('', Validators.required),
    companyType: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required),
    choosefile: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),


  });
  ngOnInit(): void {
  }
  reg_submit(){
    var jobForm = new FormData();
    jobForm.append('logo', this.RegisterForm.get('logo')?.value);
    jobForm.append('company_name', this.RegisterForm.get('company_name')?.value);
    jobForm.append('email', this.RegisterForm.get('email')?.value);
    jobForm.append('password', this.RegisterForm.get('password')?.value);
    jobForm.append('confirm_password', this.RegisterForm.get('confirm_password')?.value);
    jobForm.append('mobileNumber', this.RegisterForm.get('mobileNumber')?.value);
    jobForm.append('contactName', this.RegisterForm.get('contactName')?.value);
    jobForm.append('companyType', this.RegisterForm.get('companyType')?.value);
    jobForm.append('pincode', this.RegisterForm.get('pincode')?.value);
    jobForm.append('about', this.RegisterForm.get('about')?.value);
    jobForm.append('location', this.RegisterForm.get('location')?.value);
    jobForm.append('choosefile', this.file);
    this.empservice.employeeRegister(jobForm).subscribe((res:any)=>{
      console.log(res);
    },error => {
      error.message
    })
  }
}
