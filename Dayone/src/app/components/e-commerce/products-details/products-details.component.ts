import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
