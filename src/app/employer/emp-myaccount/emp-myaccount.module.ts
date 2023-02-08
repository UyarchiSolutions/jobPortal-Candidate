import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpMyaccountRoutingModule } from './emp-myaccount-routing.module';
import { EmpMyaccountComponent } from './emp-myaccount.component';

@NgModule({
  declarations: [EmpMyaccountComponent],
  imports: [
    CommonModule,
    EmpMyaccountRoutingModule,
  ]
})
export class EmpMyaccountModule { }
