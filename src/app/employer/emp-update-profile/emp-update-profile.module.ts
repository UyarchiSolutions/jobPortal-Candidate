import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpUpdateProfileRoutingModule } from './emp-update-profile-routing.module';
import { EmpUpdateProfileComponent } from './emp-update-profile.component';


@NgModule({
  declarations: [EmpUpdateProfileComponent],
  imports: [
    CommonModule,
    EmpUpdateProfileRoutingModule
  ]
})
export class EmpUpdateProfileModule { }
