import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckEmailComponent } from './check-email/check-email.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { EmpJobpostComponent } from './emp-jobpost/emp-jobpost.component';
import { EmpMyaccountComponent } from './emp-myaccount/emp-myaccount.component';
import { EmpCansearchComponent } from './emp-cansearch/emp-cansearch.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { EmpActionComponent } from './emp-action/emp-action.component';
import { CanDetailsComponent } from './can-details/can-details.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { SendJobComponent } from './send-job/send-job.component';
import { EmpMailTemplateComponent } from './emp-mail-template/emp-mail-template.component';
import { CreateMailTemplateComponent } from './create-mail-template/create-mail-template.component';
import { NgxEditorModule } from "ngx-editor";
import { JobPreviewComponent } from './job-preview/job-preview.component';




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
    NgxEditorModule
  ]
})
export class EmployerModule { }
