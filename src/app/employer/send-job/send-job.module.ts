import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendJobRoutingModule } from './send-job-routing.module';
import { SendJobComponent } from './send-job.component';


@NgModule({
  declarations: [SendJobComponent],
  imports: [
    CommonModule,
    SendJobRoutingModule
  ]
})
export class SendJobModule { }
