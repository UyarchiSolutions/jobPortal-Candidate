import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRecruiterRoutingModule } from './edit-recruiter-routing.module';
import { EditRecruiterComponent } from './edit-recruiter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditRecruiterComponent],
  imports: [
    CommonModule,
    EditRecruiterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EditRecruiterModule { }
