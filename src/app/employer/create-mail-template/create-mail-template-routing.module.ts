import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMailTemplateComponent } from './create-mail-template.component';

const routes: Routes = [
  {path:'',component:CreateMailTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateMailTemplateRoutingModule { }
