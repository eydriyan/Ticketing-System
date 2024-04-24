import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserviewComponent } from './userview/userview-dashboard/userview.component'
import { LoginuserComponent } from './authenticationpages/loginuser/loginuser.component';
import { SignupComponent } from './authenticationpages/signup/signup.component';
import { AdminviewComponent } from './adminview/admindashboard/adminview.component';
import { TechnicianviewComponent } from './technicianview/techniciandashboard/technicianview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserviewHistoryComponent } from './userview/userview-history/userview-history.component';
import { TechnicianhistoryComponent } from './technicianview/technicianhistory/technicianhistory.component';
import { AdminhistoryComponent } from './adminview/adminhistory/adminhistory.component';
import { AdminanalyticsComponent } from './adminview/adminanalytics/adminanalytics.component';

@NgModule({
  declarations: [
    AppComponent,
    UserviewComponent,
    LoginuserComponent,
    SignupComponent,
    AdminviewComponent,
    TechnicianviewComponent,
    UserviewHistoryComponent,
    TechnicianhistoryComponent,
    AdminhistoryComponent,
    AdminanalyticsComponent,
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
