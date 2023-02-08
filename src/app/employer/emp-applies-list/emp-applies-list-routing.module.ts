import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpAppliesListComponent } from './emp-applies-list.component';

const routes: Routes = [
  {path: '', component:EmpAppliesListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpAppliesListRoutingModule { }
