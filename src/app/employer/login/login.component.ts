import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private router: Router,private empservice: EmpServiceService) { }

  ngOnInit(): void {
  }
  loginForm = this.formBuilder.group({
    email: new FormControl(''),
    password: new FormControl(''),

  })
  login_submit(){
    this.empservice.loginFormEmployee(this.loginForm.value).subscribe((res:any)=>{
    }, error =>{
      error.error.message
    }
    )

  }
}
