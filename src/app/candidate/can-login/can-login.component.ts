import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-can-login',
  templateUrl: './can-login.component.html',
  styleUrls: ['./can-login.component.css']
})
export class CanLoginComponent implements OnInit {
  login: any = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', Validators.required)
  })
  constructor(private fb: FormBuilder, private con_Service: CanditateService,private router:Router) { }
  ngOnInit() {
  }
  // login api
  login_now() {
    console.log(this.login.value)
    this.con_Service.loginForm(this.login.value).subscribe((res:any)=>{
    }, error =>{
      error.message
    }
    )
    this.router.navigate(['/updateProfile'])
  }
}
