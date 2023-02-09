import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpHomeRoutingModule } from './emp-home-routing.module';
import { EmpHomeComponent } from './emp-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmpHomeComponent],
  imports: [
    CommonModule,
    EmpHomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpHomeModule { }
