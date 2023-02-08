import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckEmailComponent } from './check-email/check-email.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { EmpJobpostComponent } from './emp-jobpost/emp-jobpost.component';
import { EmpMyaccountComponent } from './emp-myaccount/emp-myaccount.component';
import { EmpCansearchComponent } from './emp-cansearch/emp-cansearch.component';




@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    CheckEmailComponent,
    VerifyOtpComponent,
    EmpCansearchComponent,
  
    
    
   
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
    
  
  ]
})
export class EmployerModule { }
