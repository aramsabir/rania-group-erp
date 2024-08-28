import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { userlist01List, userlist01Type } from './userlist01';

@Component({
  selector: 'app-user-list01',
  templateUrl: './user-list01.component.html',
  styleUrls: ['./user-list01.component.scss']
})
export class UserList01Component implements OnInit {
  userlist01Data: userlist01Type[];
  constructor() {
    this.userlist01Data = userlist01List
   }
  
  ngOnInit(): void {}

  remove(user : number){
    this.userlist01Data.map((e,i)=>{
      if(e.id == user){
        this.userlist01Data.splice(i,1)
      }
    })
  }
}
