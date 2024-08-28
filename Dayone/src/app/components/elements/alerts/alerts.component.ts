import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
    type: 'success',
    message: 'Success alert—At vero eos et accusamus praesentium!',
  }, {
    type: 'info',
    message: 'Info alert—At vero eos et accusamus praesentium!',
  }, {
    type: 'warning',
    message: 'Warning alert—At vero eos et accusamus praesentium!',
  }, {
    type: 'danger',
    message: 'Danger alert—At vero eos et accusamus praesentium!',
  }
];

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  public alerts!: Alert[];
  alertIconSuccess= true;
  alertIconInfo= true;
  alertIconWarning= true;
  alertIconDanger= true;

  alertStyleSuccess= true;
  alertStyleInfo= true;
  alertStyleWarning= true;
  alertStyleDanger= true;
  InfoMessage:boolean = false;
  successMessage:boolean = false;
  WarningMessage:boolean = false;
  DangerMessage:boolean = false;
  private _success = new Subject<string>();

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert!: NgbAlert;
  constructor() {
    this.alerts = Array.from(ALERTS);    
   }

  ngOnInit(): void { }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  public changeInfoMessage() { 
    this.InfoMessage = true;
    this.successMessage = false;
    this.WarningMessage = false;
    this.DangerMessage = false;
  }
  public changeSuccessMessage() { 
    this.successMessage = true;
    this.InfoMessage = false;
    this.WarningMessage = false;
    this.DangerMessage = false;
  }
  public changeWarningMessage() { 
    this.WarningMessage = true;
    this.InfoMessage = false;
    this.successMessage = false;
    this.DangerMessage = false;
  }
  public changeDangerMessage() { 
    this.DangerMessage = true;
    this.InfoMessage = false;
    this.successMessage = false;
    this.WarningMessage = false;
  }
}