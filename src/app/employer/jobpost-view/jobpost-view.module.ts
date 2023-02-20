import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobpostViewRoutingModule } from './jobpost-view-routing.module';
import { JobpostViewComponent } from './jobpost-view.component';


@NgModule({
  declarations: [JobpostViewComponent],
  imports: [
    CommonModule,
    JobpostViewRoutingModule
  ]
})
export class JobpostViewModule { }
