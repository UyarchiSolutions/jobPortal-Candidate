import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationdetailsComponent } from './educationdetails.component';

const routes: Routes = [
  {path:'',component:EducationdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationdetailsRoutingModule { }
