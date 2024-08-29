import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';


export const content: Routes = [
 
  {
    path: 'settings',
    loadChildren: () => import('../../components/erp_settings/module').then(m => m.SettingsModule)
  },
 
  
  // {
  //   path: 'bas-accidents',
  //   loadChildren: () => import('../../components/aso-bricks/module').then(m => m.BasAccidentsModule)
  // },
   
  // {
  //   path: 'bas-home',
  //   loadChildren: () => import('../../components/bas-home/bas-home.module').then(m => m.BasHomeModule)
  // },
  {
    path: 'home',
    loadChildren: () => import('../../components/bas-home/bas-home.module').then(m => m.BasHomeModule)
  },
  // {
  //   path: 'error-page',
  //   loadChildren: () => import('../../custom-pages/error/error.module').then(m => m.ErrorModule),
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('../../custom-pages/account/account.module').then(m => m.AccountModule),
  // },
  // {
  //   path: 'alert',
  //   loadChildren: () => import('../../custom-pages/alert-message/alert-message.module').then(m => m.AlertMessageModule),
  // },
  // {
  //   path: 'support-system',
  //   loadChildren: () => import('../../components/support-system/support-system.module').then(m => m.SupportSystemModule)
  // },

  // {
  //   path: 'hr-dashboard',
  //   loadChildren: () => import('../../components/dashboards/dashboard/dashboard.module').then(m => m.DashboardModule)
  // },
  // {
  //   path: 'employee-dashboard',
  //   loadChildren: () => import('../../components/dashboards/employee-dashboard/employee-dashboard.module').then(m => m.EmployeeDashboardModule)
  // },
  // {
  //   path: 'task-dashboard',
  //   loadChildren: () => import('../../components/dashboards/task-dashboard/task-dashboard.module').then(m => m.TaskDashboardModule)
  // },
  // {
  //   path: 'project-dashboard',
  //   loadChildren: () => import('../../components/dashboards/project-dashboard/project-dashboard.module').then(m => m.ProjectDashboardModule)
  // },
  // {
  //   path: 'client-dashboard',
  //   loadChildren: () => import('../../components/dashboards/client-dashboard/client-dashboard.module').then(m => m.ClientDashboardModule)
  // },
  // {
  //   path: 'job-dashboard',
  //   loadChildren: () => import('../../components/dashboards/job-dashboard/job-dashboard.module').then(m => m.JobDashboardModule)
  // },
  // {
  //   path: 'chat',
  //   loadChildren: () => import('../../components/chat/chat.module').then(m => m.ChatModule)
  // },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('../../components/admin/admin.module').then(m => m.AdminModule)
  // },
  // {
  //   path: 'super-admin',
  //   loadChildren: () => import('../../components/dashboards/super-admin/super-admin.module').then(m => m.SuperAdminModule)
  // },
  {
    path: 'components',
    loadChildren: () => import('../../components/components/components.module').then(m => m.ComponentsModule)
  },
  {
    path: 'elements',
    loadChildren: () => import('../../components/elements/elements.module').then(m => m.ElementsModule)
  },
  // {
  //   path: 'forms',
  //   loadChildren: () => import('../../components/apps/forms/forms.module').then(m => m.FormModule)
  // },
  // {
  //   path: 'charts',
  //   loadChildren: () => import('../../components/apps/charts/charts.module').then(m => m.ChartSModule)
  // },
  // {
  //   path: 'widgets',
  //   loadChildren: () => import('../../components/apps/widgets/widgets.module').then(m => m.WidgetsModule)
  // },
  // {
  //   path: 'maps',
  //   loadChildren: () => import('../../components/apps/maps/maps.module').then(m => m.MapsModule)
  // },
  // {
  //   path: 'tables',
  //   loadChildren: () => import('../../components/apps/tables/tables.module').then(m => m.TablesModule)
  // },
  // {
  //   path: 'icons',
  //   loadChildren: () => import('../../components/apps/icons/icons.module').then(m => m.IconsModule)
  // },
  // {
  //   path: 'pages',
  //   loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule)
  // },
  // {
  //   path: 'ecommerce',
  //   loadChildren: () => import('../../components/e-commerce/e-commerce.module').then(m => m.ECommerceModule)
  // },
  // {
  //   path: 'utils',
  //   loadChildren: () => import('../../components/pages/utils/utils.module').then(m => m.UtilsModule)
  // },
];
