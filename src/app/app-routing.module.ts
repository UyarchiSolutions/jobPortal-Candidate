import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanHomeComponent } from './can-home/can-home.component';
import { LoginComponent } from './employer/login/login.component';
import { RegisterComponent } from './employer/register/register.component';
import { CanLoginComponent } from './candidate/can-login/can-login.component';
import { CanRegisterComponent } from './candidate/can-register/can-register.component';
import { CheckmailtamplateComponent } from './candidate/checkmailtamplate/checkmailtamplate.component';
import { CanMobileverifyComponent } from './candidate/can-mobileverify/can-mobileverify.component';
import { CheckEmailComponent } from './employer/check-email/check-email.component';
import { VerifyOtpComponent } from './employer/verify-otp/verify-otp.component';
import { UpdateprofileComponent } from './candidate/updateprofile/updateprofile.component';
import { CanGetComponent } from './candidate/can-get/can-get.component';
import { EmpJobdetailsComponent } from './candidate/emp-jobdetails/emp-jobdetails.component';

const routes: Routes = [
   {path:"",component:CanHomeComponent},
   {path:"register",component:RegisterComponent},
   {path:"login",component:LoginComponent},
   {path:"empcheck-mail",component:CheckEmailComponent},
   {path:"empverify-otp",component:VerifyOtpComponent},
   {path: 'empupdate-profile',loadChildren: () => import('./employer/emp-update-profile/emp-update-profile.module').then(m => m.EmpUpdateProfileModule) },
   {path: 'emp-home',loadChildren: () => import('./employer/emp-home/emp-home.module').then(m => m.EmpHomeModule) },
   {path: 'emp-postjob',loadChildren: () => import('./employer/emp-jobpost/emp-jobpost.module').then(m => m.EmpJobpostModule) },
   {path: 'emp-account',loadChildren: () => import('./employer/emp-myaccount/emp-myaccount.module').then(m => m.EmpMyaccountModule) },




    {path:"canlogin",component:CanLoginComponent},
    {path:"can-register",component:CanRegisterComponent},
    {path:"checkmailCan",component:CheckmailtamplateComponent},
    {path:"VeriftOPT",component:CanMobileverifyComponent},
    {path:"updateProfile",component:UpdateprofileComponent},
    {path:"canJobs",component:CanGetComponent},
    {path:"can-employ",component:EmpJobdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
