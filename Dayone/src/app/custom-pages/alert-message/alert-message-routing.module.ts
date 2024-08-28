import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DangerMessageComponent } from './danger-message/danger-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { WarningMessageComponent } from './warning-message/warning-message.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'success-message',
        component: SuccessMessageComponent
      },
      {
        path: 'danger-message',
        component: DangerMessageComponent
      },
      {
        path: 'warning-message',
        component: WarningMessageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertMessageRoutingModule { }
