import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRecruiterRoutingModule } from './manage-recruiter-routing.module';
import { ManageRecruiterComponent } from './manage-recruiter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManageRecruiterComponent],
  imports: [
    CommonModule,
    ManageRecruiterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ManageRecruiterModule { }
