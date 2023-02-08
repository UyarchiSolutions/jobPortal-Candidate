import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl('', Validators.required)

  })
  access: any;
  constructor(private formBuilder:FormBuilder,private router: Router,private empservice: EmpServiceService) { }

  ngOnInit(): void {
  }

  login_submit(){
    console.log(this.loginForm.value)
    this.empservice.loginFormEmployee(this.loginForm.value).subscribe((res:any)=>{
      this.access = res.tokens.refresh.token
      console.log(  this.access,"  this.gettoken")
      localStorage.setItem("tokenloginEmplooyeee",this.access)

    }, error =>{
      error.error.message
    }
    )
    this.router.navigateByUrl('emp-home')
  }
}
