import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanLoginComponent } from './can-login/can-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CanRegisterComponent } from './can-register/can-register.component';
import { CheckmailtamplateComponent } from './checkmailtamplate/checkmailtamplate.component';
import { CanMobileverifyComponent } from './can-mobileverify/can-mobileverify.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { CanGetComponent } from './can-get/can-get.component';
import { EmpJobdetailsComponent } from './emp-jobdetails/emp-jobdetails.component';
import { EducationdetailsComponent } from './educationdetails/educationdetails.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ProffesinoalComponent } from './proffesinoal/proffesinoal.component';
import { ApplymailjobsComponent } from './applymailjobs/applymailjobs.component';
import { ViewFulldetailsComponent } from './view-fulldetails/view-fulldetails.component';
import { JobpreviewPopupComponent } from './jobpreview-popup/jobpreview-popup.component';
import { GetallcandidateProfileComponent } from './getallcandidate-profile/getallcandidate-profile.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SafePipe } from './safe.pipe';
import { CandidatechangepasswordComponent } from './candidatechangepassword/candidatechangepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SendotpforgotComponent } from './sendotpforgot/sendotpforgot.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReportPopupComponent } from './report-popup/report-popup.component';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { MobileverificationComponent } from './mobileverification/mobileverification.component';



@NgModule({
  declarations: [
    CanLoginComponent,
    CanRegisterComponent,
    CheckmailtamplateComponent,
    CanMobileverifyComponent,
    CanGetComponent,
    EmpJobdetailsComponent,
    EducationdetailsComponent,
    ProffesinoalComponent,
    ApplymailjobsComponent,
    ViewFulldetailsComponent,
    JobpreviewPopupComponent,
    GetallcandidateProfileComponent,
    SafePipe,
    CandidatechangepasswordComponent,
    ForgotpasswordComponent,
    SendotpforgotComponent,
    NewpasswordComponent,
    ReportPopupComponent,
    EmailverificationComponent,
    MobileverificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
    NgxExtendedPdfViewerModule,
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class CandidateModule { }
