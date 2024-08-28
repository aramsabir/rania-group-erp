import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/@core/guards';
import { FamilyMallMainComponent } from './components/main/component';
 

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FamilyMallMainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'fm:read'
        }
      },
      {
        path: 'main',
        component: FamilyMallMainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'fm:read'
        }
      },
      

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }
