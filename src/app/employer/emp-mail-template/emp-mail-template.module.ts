import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpMailTemplateRoutingModule } from './emp-mail-template-routing.module';
import { EmpMailTemplateComponent } from './emp-mail-template.component';


@NgModule({
  declarations: [EmpMailTemplateComponent],
  imports: [
    CommonModule,
    EmpMailTemplateRoutingModule
  ]
})
export class EmpMailTemplateModule { }
