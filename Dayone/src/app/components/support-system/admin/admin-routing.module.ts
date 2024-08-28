import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { CategoriesComponent } from './categories/categories.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'articles',
        component: ArticlesComponent
      },
      {
        path: 'customerView',
        component: CustomerViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
