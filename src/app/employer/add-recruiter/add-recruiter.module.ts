import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRecruiterRoutingModule } from './add-recruiter-routing.module';
import { AddRecruiterComponent } from './add-recruiter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddRecruiterComponent],
  imports: [
    CommonModule,
    AddRecruiterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddRecruiterModule { }
