import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedFolderComponent } from './saved-folder.component';

const routes: Routes = [
  {path:'',component:SavedFolderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedFolderRoutingModule { }
