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
import { AgmCoreModule } from '@agm/core';




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
    ReactiveFormsModule,
    FormsModule,
    EmployerModule,
    GooglePlaceModule,
    NgxEditorModule,
    NgxExtendedPdfViewerModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDoYhbYhtl9HpilAZSy8F_JHmzvwVDoeHI',
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
