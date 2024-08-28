import { Routes } from '@angular/router';

export const support: Routes = [
  {
    path: 'support-system',
    loadChildren: () => import('../../components/support-system/support-system.module').then(m => m.SupportSystemModule)
  },
];
