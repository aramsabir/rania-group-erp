import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesComponent } from './data-tables/data-tables.component';
import { DefaultTablesComponent } from './default-tables/default-tables.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default-table',
        component: DefaultTablesComponent
      },
      {
        path: 'data-table',
        component: DataTablesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
