import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpJobpostComponent } from './emp-jobpost.component';

const routes: Routes = [
  {path: '', component:EmpJobpostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpJobpostRoutingModule { }
