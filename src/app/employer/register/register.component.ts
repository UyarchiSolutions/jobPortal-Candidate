import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
   
   }
   RegisterForm = this.formBuilder.group({
    logo: new FormControl(''),
    company_name: new FormControl(''),
    company_mail: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    mobile: new FormControl(''),
    contact_name: new FormControl(''),
    company_type: new FormControl(''),
    pincode: new FormControl(''),
    about: new FormControl(''),
    file: new FormControl(''),
    location: new FormControl(''),


  });
  ngOnInit(): void {
  }
  reg_submit(){
   
  }
}
