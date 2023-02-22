import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpJobdetailsComponent } from './emp-jobdetails.component';

const routes: Routes = [
  {path:'',component:EmpJobdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpJobdetailsRoutingModule { }
