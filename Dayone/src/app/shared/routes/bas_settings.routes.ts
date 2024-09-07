import { Routes } from '@angular/router';


export const base_setting_routes: Routes = [
  {
    path: 'bas-settings',
    loadChildren: () => import('../../components/erp_settings/module').then(m => m.SettingsModule)
  },
 
];
