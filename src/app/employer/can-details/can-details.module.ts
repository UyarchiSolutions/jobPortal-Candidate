import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanDetailsRoutingModule } from './can-details-routing.module';
import { CanDetailsComponent } from './can-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CanDetailsComponent],
  imports: [
    CommonModule,
    CanDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CanDetailsModule { }
