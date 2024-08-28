import { Component, OnInit } from '@angular/core';
import { shoppingCartData, shoppingCartType } from './shoppingCart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartList: shoppingCartType[];

  constructor() {
    this.shoppingCartList = shoppingCartData
   }

  ngOnInit(): void {
  }

  remove(listId){
    this.shoppingCartList.map((el,ind)=>{
      if(el.id == listId){
        this.shoppingCartList.splice(ind, 1)
      }
    })
  }

}
