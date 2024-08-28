import { Routes } from '@angular/router';


export const base_setting_routes: Routes = [
  {
    path: 'bas-settings',
    loadChildren: () => import('../../components/bas_settings/bas_settings.module').then(m => m.BasSettingsModule)
  },
 
];
