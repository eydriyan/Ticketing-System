import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserviewComponent } from './userview/userview.component'
import { LoginComponent } from './authenticationpages/login/login.component';
import { SignupComponent } from './authenticationpages/signup/signup.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { TechnicianviewComponent } from './technicianview/technicianview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserviewComponent,
    LoginComponent,
    SignupComponent,
    AdminviewComponent,
    TechnicianviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
