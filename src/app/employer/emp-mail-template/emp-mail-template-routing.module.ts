import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpMailTemplateComponent } from './emp-mail-template.component';

const routes: Routes = [
  {path:'',component:EmpMailTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpMailTemplateRoutingModule { }
