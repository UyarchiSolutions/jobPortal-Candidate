import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanHomeComponent } from './can-home/can-home.component';
import { CandidateModule } from './candidate/candidate.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployerModule } from './employer/employer.module';
import { NgxEditorModule } from "ngx-editor";
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RedirectComponent } from './redirect/redirect.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';




@NgModule({
  declarations: [
    AppComponent,
    CanHomeComponent,
    HeaderComponent,
    FooterComponent,
    RedirectComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CandidateModule,
    ReactiveFormsModule,
    FormsModule,
    EmployerModule,
    GooglePlaceModule,
    NgxEditorModule,
    NgxExtendedPdfViewerModule,
    NgMultiSelectDropDownModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
