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

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule
  ]
})
export class CandidateModule { }
