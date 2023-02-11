import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpActionComponent } from './emp-action.component';

const routes: Routes = [
  {path: '', component:EmpActionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpActionRoutingModule { }
