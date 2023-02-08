import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpHomeRoutingModule } from './emp-home-routing.module';
import { EmpHomeComponent } from './emp-home.component';


@NgModule({
  declarations: [EmpHomeComponent],
  imports: [
    CommonModule,
    EmpHomeRoutingModule
  ]
})
export class EmpHomeModule { }
