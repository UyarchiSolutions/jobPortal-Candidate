import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanDetailsRoutingModule } from './can-details-routing.module';
import { CanDetailsComponent } from './can-details.component';


@NgModule({
  declarations: [CanDetailsComponent],
  imports: [
    CommonModule,
    CanDetailsRoutingModule,
    
  ]
})
export class CanDetailsModule { }
