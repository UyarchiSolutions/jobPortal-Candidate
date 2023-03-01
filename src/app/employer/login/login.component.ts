import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false

  loginForm = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', Validators.required),
  });
  access: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private empservice: EmpServiceService
  ) {}

  ngOnInit(): void {}

  login_submit() {
    this.submitted = true
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.empservice.loginFormEmployee(this.loginForm.value).subscribe(
        (res: any) => {
          console.log(res.user.name);
          localStorage.setItem('empname',res.user.name)
          this.access = res.tokens.refresh.token;
          this.empservice.set_current_token(res.tokens.refresh.token);
          this.empservice.get_usename(res.user.name)
          this.setCookie(res.tokens.refresh.token);
          this.router.navigateByUrl('emp-home');
        },
        (error) => {
          error.error.message;
        }
      );
    }
   
  }
  setCookie(token: any) {
    let d: Date = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    document.cookie = `emptoken=${token}; ${expires}`;
  }
}
