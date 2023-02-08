import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpJobpostRoutingModule } from './emp-jobpost-routing.module';
import { EmpJobpostComponent } from './emp-jobpost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmpJobpostComponent],
  imports: [
    CommonModule,
    EmpJobpostRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmpJobpostModule { }
