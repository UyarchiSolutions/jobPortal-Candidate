import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendJobRoutingModule } from './send-job-routing.module';
import { SendJobComponent } from './send-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SendJobComponent],
  imports: [
    CommonModule,
    SendJobRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SendJobModule { }
