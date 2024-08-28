import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  disabled = false;
  constructor() { }
  ngOnInit(): void {}
  public isFirstGradient = false;
  public isSecondGradient = false;
   
  FirstGradient() {
    this.isFirstGradient = !this.isFirstGradient;
    if (this.isFirstGradient == true) {
      document.querySelector('.firstgradient')?.classList.remove('collapsed');
    } else {
      document.querySelector('.firstgradient')?.classList.add('collapsed');
    }
  }
  SecondGradient() {
    this.isSecondGradient = !this.isSecondGradient;
    if (this.isSecondGradient == true) {
      document.querySelector('.secondgradient')?.classList.remove('collapsed');
    } else {
      document.querySelector('.secondgradient')?.classList.add('collapsed');
    }
  }

  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }
}
