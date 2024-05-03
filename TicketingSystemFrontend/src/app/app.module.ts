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
import { HeaderComponent } from './components/header/header.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { TechnicianDashboardComponent } from './components/technician-dashboard/technician-dashboard.component';
import { TechnicianHistoryComponent } from './components/technician-history/technician-history.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHistoryComponent } from './components/admin-history/admin-history.component';
import { AdminAnalyticsComponent } from './components/admin-analytics/admin-analytics.component';

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
    HeaderComponent,
    SignupPageComponent,
    LoginPageComponent,
    UserDashboardComponent,
    UserHistoryComponent,
    TechnicianDashboardComponent,
    TechnicianHistoryComponent,
    AdminDashboardComponent,
    AdminHistoryComponent,
    AdminAnalyticsComponent,
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
