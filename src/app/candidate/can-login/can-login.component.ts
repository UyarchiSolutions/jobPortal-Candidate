import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditService } from 'src/app/candit.service';
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
  constructor(private fb: FormBuilder, private con_Service: CanditateService,private router:Router,private CanditService:CanditService) { }
  ngOnInit() {
  }
  // login api
  login_now() {
    this.con_Service.loginForm(this.login.value).subscribe((res:any)=>{
      this.setCookie(res.tokens.refresh.token);
      localStorage.setItem('name',res.user.name)
      this.CanditService.set_current_token(res.tokens.refresh.token);
      this.CanditService.get_usename(res.user.name)
      if(res.Boolean ==false){
        this.router.navigate(['/updateProfile'])
      }else{
        this.router.navigate(['/canJobs'])
      }
    }, error =>{
      error.message
    }


    )

  }
  setCookie(token: any) {
    let d: Date = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    document.cookie = `tokens=${token}; ${expires}`;
  }
}
