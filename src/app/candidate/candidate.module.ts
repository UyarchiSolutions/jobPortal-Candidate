import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanLoginComponent } from './can-login/can-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CanRegisterComponent } from './can-register/can-register.component';
import { CheckmailtamplateComponent } from './checkmailtamplate/checkmailtamplate.component';
import { CanMobileverifyComponent } from './can-mobileverify/can-mobileverify.component';



@NgModule({
  declarations: [
    CanLoginComponent,
    CanRegisterComponent,
    CheckmailtamplateComponent,
    CanMobileverifyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CandidateModule { }
