import { Routes } from '@angular/router';


export const base_home_routes: Routes = [
  {
    path: 'bas-home',
    loadChildren: () => import('../../components/bas-home/bas-home.module').then(m => m.BasHomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import('../../components/bas-home/bas-home.module').then(m => m.BasHomeModule)
  },

];
