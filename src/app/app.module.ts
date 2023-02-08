import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanHomeComponent } from './can-home/can-home.component';
import { CandidateModule } from './candidate/candidate.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployerModule } from './employer/employer.module';

@NgModule({
  declarations: [
    AppComponent,
    CanHomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CandidateModule,
    ReactiveFormsModule,
    FormsModule,
    EmployerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
