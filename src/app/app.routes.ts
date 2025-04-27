import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SystemlistComponent } from './Pages/systemlist/systemlist.component';
import { ReportComponent } from './Pages/report/report.component';

export const routes: Routes = [
    {path:'',component:LoginComponent , pathMatch:'full'},
    {path:'main',component:MainComponent, children:[
      {
        path:'',
        component:DashboardComponent
      },
    {
      path:'dashboard',
      component:DashboardComponent
    },
    {
      path:'report',
      component:ReportComponent
    },
    {
        path: 'systemlist',  // Child route
        component: SystemlistComponent
    }
    ]
    },
    {path:'**',component:LoginComponent },

];
