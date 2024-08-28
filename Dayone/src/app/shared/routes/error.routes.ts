import { Routes } from '@angular/router';

export const error: Routes = [
  {
    path: 'error-page',
    loadChildren: () => import('../../custom-pages/error/error.module').then(m => m.ErrorModule),
  },
];
