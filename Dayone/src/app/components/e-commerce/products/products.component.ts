import { Component, OnInit } from '@angular/core';
import { productsData, productsType } from './products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  page = 1;
  productsList: productsType[];
  constructor() {
    this.productsList = productsData;
   }

  ngOnInit(): void {
  }

}
