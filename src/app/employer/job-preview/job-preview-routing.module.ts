import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobPreviewComponent } from './job-preview.component';

const routes: Routes = [
  {path: '', component:JobPreviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPreviewRoutingModule { }
