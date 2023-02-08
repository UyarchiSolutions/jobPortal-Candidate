import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpMyaccountComponent } from './emp-myaccount.component';

const routes: Routes = [
  {path:'',component:EmpMyaccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpMyaccountRoutingModule { }
