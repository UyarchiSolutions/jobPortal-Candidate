import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpAppliesListRoutingModule } from './emp-applies-list-routing.module';
import { EmpAppliesListComponent } from './emp-applies-list.component';


@NgModule({
  declarations: [EmpAppliesListComponent],
  imports: [
    CommonModule,
    EmpAppliesListRoutingModule
  ]
})
export class EmpAppliesListModule { }
