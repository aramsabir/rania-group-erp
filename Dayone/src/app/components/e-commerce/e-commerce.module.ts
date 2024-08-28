import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsDetailsComponent,
    ShoppingCartComponent,
  ],
  imports: [
    CommonModule,
    ECommerceRoutingModule,
    NgbModule,
    NgSelectModule,
    SharedModule
  ]
})
export class ECommerceModule { }
