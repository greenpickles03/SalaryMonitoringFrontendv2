import { Routes } from '@angular/router';

import { AppErrorComponent } from './error/error.component';
import { AppMaintenanceComponent } from './maintenance/maintenance.component';
import { AppSalaryLoginComponent } from './salary-login/salary-login.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: AppErrorComponent,
      },
      {
        path: 'maintenance',
        component: AppMaintenanceComponent,
      },
      // {
      //   path: 'side-forgot-pwd',
      //   component: AppSideForgotPasswordComponent,
      // },
      {
        path: 'login',
        component: AppSalaryLoginComponent,
      },
      // {
      //   path: 'side-register',
      //   component: AppSideRegisterComponent,
      // },
    ],
  },
];
