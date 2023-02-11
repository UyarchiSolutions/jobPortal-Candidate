import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpActionRoutingModule } from './emp-action-routing.module';
import { EmpActionComponent } from './emp-action.component';


@NgModule({
  declarations: [EmpActionComponent],
  imports: [
    CommonModule,
    EmpActionRoutingModule
  ]
})
export class EmpActionModule { }
