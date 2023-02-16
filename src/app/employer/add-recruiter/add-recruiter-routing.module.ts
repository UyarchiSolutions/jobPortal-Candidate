import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecruiterComponent } from './add-recruiter.component';

const routes: Routes = [
  {path: '', component:AddRecruiterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRecruiterRoutingModule { }
