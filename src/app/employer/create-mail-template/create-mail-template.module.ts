import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateMailTemplateRoutingModule } from './create-mail-template-routing.module';
import { CreateMailTemplateComponent } from './create-mail-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [CreateMailTemplateComponent],
  imports: [
    CommonModule,
    CreateMailTemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    GooglePlaceModule
  ]
})
export class CreateMailTemplateModule { }
