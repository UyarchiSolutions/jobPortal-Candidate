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
  addresume(file: any) {
    console.log("sbdhsbdhj")
    // this.candidateFile = null;
    const res = file.target.files[0] as File;
    if (res != null) {
      if (
        res.type == 'application/pdf' ||
        res.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        // this.candidateFile = res;
      }
    }
  }
}
