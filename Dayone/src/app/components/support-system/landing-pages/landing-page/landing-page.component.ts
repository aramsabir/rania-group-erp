import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  active = 1;
  constructor() { }
  
  ngOnInit(): void {
  }
  
  chatPopup(){
    let chat =  document.querySelector('.chat-message-popup');
    if(chat?.classList.contains('active')){
      chat?.classList.remove('active');
    }
    else{
      chat?.classList.add('active');
    }
  }
  
  removeActive(){
    let chat =  document.querySelector('.chat-message-popup');
    chat?.classList.remove('active');
  }
}
