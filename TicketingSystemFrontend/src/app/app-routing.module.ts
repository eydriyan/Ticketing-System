import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupComponent } from './authenticationpages/signup/signup.component';
import { UserviewComponent } from './userview/userview-dashboard/userview.component';
import { AdminviewComponent } from './adminview/admindashboard/adminview.component';
import { TechnicianviewComponent } from './technicianview/techniciandashboard/technicianview.component';
import { TechnicianhistoryComponent } from './technicianview/technicianhistory/technicianhistory.component';
import { UserviewHistoryComponent } from './userview/userview-history/userview-history.component';
import { AdminanalyticsComponent } from './adminview/adminanalytics/adminanalytics.component';
import { AdminhistoryComponent } from './adminview/adminhistory/adminhistory.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'userdashboard', component: UserviewComponent },
  { path: 'userhistory', component: UserviewHistoryComponent},
  { path: 'admindashboard', component: AdminviewComponent },
  { path: 'adminhistory', component: AdminhistoryComponent},
  { path: 'adminanalytics', component: AdminanalyticsComponent},
  { path: 'techniciandashboard', component: TechnicianviewComponent },
  { path: 'technicianhistory', component: TechnicianhistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
