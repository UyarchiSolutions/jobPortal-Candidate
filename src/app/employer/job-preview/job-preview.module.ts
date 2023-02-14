import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobPreviewRoutingModule } from './job-preview-routing.module';
import { JobPreviewComponent } from './job-preview.component';


@NgModule({
  declarations: [JobPreviewComponent],
  imports: [
    CommonModule,
    JobPreviewRoutingModule
  ]
})
export class JobPreviewModule { }
