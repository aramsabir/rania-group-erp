import { Routes } from '@angular/router';

export const account: Routes = [
  {
    path: 'account',
    loadChildren: () => import('../../custom-pages/account/account.module').then(m => m.AccountModule),
  },
  {
    path: 'alert',
    loadChildren: () => import('../../custom-pages/alert-message/alert-message.module').then(m => m.AlertMessageModule),
  },
];
