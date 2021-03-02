import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifyMessage;
  notifyMessageStrong;
  notifyState :boolean = false
  alertType;
  closeNotify
  constructor() { }

  ngOnInit() {
  }
  // [?] call this notifyMe from any parent compoenent and put in it alert color Class in (alertType) and put notifications Message in (notifyMessage)
  notifyMe(alertType, notifyMessage, notifyMessageStrong){
    clearTimeout(this.closeNotify)
    this.notifyMessage = notifyMessage
    this.notifyMessageStrong = notifyMessageStrong
    this.alertType = alertType
    this.notifyState = true
    this.closeNotify = setTimeout(() => { 
      this.notifyState = false
    }, 5000)
  }
}
