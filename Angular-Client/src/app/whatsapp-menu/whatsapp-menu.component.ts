import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service'

@Component({
  selector: 'app-whatsapp-menu',
  templateUrl: './whatsapp-menu.component.html',
  styleUrls: ['./whatsapp-menu.component.css']
})
export class WhatsappMenuComponent implements OnInit {
  constructor(private contact_service: ContactService) { }
  data
  isLoaded
  ngOnInit() {
    this.getdata()
  }
  openMenu(){
    $('#menuBut').click()
  }
  getdata() {
    this.contact_service.getSections().subscribe(res => {
      this.data = res[0].contact_info.socialMedia[5].whatsapp
    }, err => { }, () => {
      this.isLoaded = true
    })
  }
}
