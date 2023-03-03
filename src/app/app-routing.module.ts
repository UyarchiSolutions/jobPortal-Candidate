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
import { EducationdetailsComponent } from './candidate/educationdetails/educationdetails.component';
import { ProffesinoalComponent } from './candidate/proffesinoal/proffesinoal.component';
import { ApplymailjobsComponent } from './candidate/applymailjobs/applymailjobs.component';
import { ViewFulldetailsComponent } from './candidate/view-fulldetails/view-fulldetails.component';
import { JobpreviewPopupComponent } from './candidate/jobpreview-popup/jobpreview-popup.component';
import { GetallcandidateProfileComponent } from './candidate/getallcandidate-profile/getallcandidate-profile.component';
import { CandidatechangepasswordComponent } from './candidate/candidatechangepassword/candidatechangepassword.component';
import { ForgotpasswordComponent } from './candidate/forgotpassword/forgotpassword.component';
import { SendotpforgotComponent } from './candidate/sendotpforgot/sendotpforgot.component';
import { NewpasswordComponent } from './candidate/newpassword/newpassword.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ReportPopupComponent } from './candidate/report-popup/report-popup.component';
import { EmailverificationComponent } from './candidate/emailverification/emailverification.component';
import { MobileverificationComponent } from './candidate/mobileverification/mobileverification.component';

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
   {path: 'emp-action',loadChildren: () => import('./employer/emp-action/emp-action.module').then(m => m.EmpActionModule) },
   {path: 'can-details',loadChildren: () => import('./employer/can-details/can-details.module').then(m => m.CanDetailsModule) },
   {path: 'sendMail',loadChildren: () => import('./employer/send-mail/send-mail.module').then(m => m.SendMailModule) },
   {path: 'sendJob',loadChildren: () => import('./employer/send-job/send-job.module').then(m => m.SendJobModule) },
   {path: 'emp-email-template',loadChildren: () => import('./employer/emp-mail-template/emp-mail-template.module').then(m => m.EmpMailTemplateModule) },
   {path: 'create-email-template',loadChildren: () => import('./employer/create-mail-template/create-mail-template.module').then(m => m.CreateMailTemplateModule) },
   {path: 'job-preview',loadChildren: () => import('./employer/job-preview/job-preview.module').then(m => m.JobPreviewModule) },
   {path: 'saved-folder',loadChildren: () => import('./employer/saved-folder/saved-folder.module').then(m => m.SavedFolderModule) },
   {path: 'saved-search',loadChildren: () => import('./employer/saved-search/saved-search.module').then(m => m.SavedSearchModule) },
   {path: 'add-recruiter',loadChildren: () => import('./employer/add-recruiter/add-recruiter.module').then(m => m.AddRecruiterModule) },
   {path: 'manage-recruiter',loadChildren: () => import('./employer/manage-recruiter/manage-recruiter.module').then(m => m.ManageRecruiterModule) },
   {path: 'edit-recruiter',loadChildren: () => import('./employer/edit-recruiter/edit-recruiter.module').then(m => m.EditRecruiterModule) },
   {path: 'edit-jobpost',loadChildren: () => import('./employer/edit-jobpost/edit-jobpost.module').then(m => m.EditJobpostModule) },
   {path: 'view-jobpost',loadChildren: () => import('./employer/jobpost-view/jobpost-view.module').then(m => m.JobpostViewModule) },




    {path:"canlogin",component:CanLoginComponent},
    {path:"can-register",component:CanRegisterComponent},
    {path:"checkmailCan",component:CheckmailtamplateComponent},
    {path:"VeriftOPT",component:CanMobileverifyComponent},
    {path:"updateProfile",loadChildren:() => import('./candidate/updateprofile/updateprofile.module').then(m => m.UpdateprofileModule)},
    {path:"canJobs",loadChildren:() => import('./candidate/can-get/can-get.module').then(m => m.CanGetModule)},
    {path:"can-employ",loadChildren:() => import('./candidate/emp-jobdetails/emp-jobdetails.module').then(m => m.EmpJobdetailsModule)},
    {path:"can-edu",loadChildren:() =>import('./candidate/educationdetails/educationdetails.module').then(m => m.EducationdetailsModule)},
    {path:"can-proffesinal",loadChildren:() =>import('./candidate/proffesinoal/proffesinoal.module').then(m => m.ProffesinoalModule)},
    {path:"can-mailApply",component:ApplymailjobsComponent},
    {path:"viewprofile",component:ViewFulldetailsComponent},
    {path:'mail-details',component:JobpreviewPopupComponent},
    {path:'getAllprofile',component:GetallcandidateProfileComponent},
    {path:'changePassword',component:CandidatechangepasswordComponent},
    {path:'forgotpassword',component:ForgotpasswordComponent},
    {path:'sendOtp',component:SendotpforgotComponent},
    {path:'newPAss',component:NewpasswordComponent},
    {path:'redirect',component:RedirectComponent},
    {path:'report',component:ReportPopupComponent},
    {path:'email-verification',component:EmailverificationComponent},
    {path:'mobile-verification',component:MobileverificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
