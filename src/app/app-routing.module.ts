import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanHomeComponent } from './can-home/can-home.component';
import { LoginComponent } from './employer/login/login.component';
import { RegisterComponent } from './employer/register/register.component';
import { CanLoginComponent } from './candidate/can-login/can-login.component';
import { CanRegisterComponent } from './candidate/can-register/can-register.component';
import { CheckmailtamplateComponent } from './candidate/checkmailtamplate/checkmailtamplate.component';
import { CanMobileverifyComponent } from './candidate/can-mobileverify/can-mobileverify.component';
import { UpdateprofileComponent } from './candidate/updateprofile/updateprofile.component';

const routes: Routes = [
   {path:"",component:CanHomeComponent},
   {path:"register",component:RegisterComponent},
   {path:"login",component:LoginComponent},

    {path:"canlogin",component:CanLoginComponent},
    {path:"can-register",component:CanRegisterComponent},
    {path:"checkmailCan",component:CheckmailtamplateComponent},
    {path:"VeriftOPT",component:CanMobileverifyComponent},
    {path:"updateProfile",component:UpdateprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
