import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../services/contact.service'
import { WhatsappMenuComponent } from '../whatsapp-menu/whatsapp-menu.component'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild(WhatsappMenuComponent) whatsapp_menu: WhatsappMenuComponent;
  constructor(private contact_service: ContactService) { }
  data
  isLoaded
  ngOnInit() {
    this.getdata()
  }
  openWhatsappMenu(){
    this.whatsapp_menu.openMenu()
  }
  getdata() {
    this.contact_service.getSections().subscribe(res => {
      this.data = res[0].contact_info.socialMedia
    }, err => { }, () => {
      this.isLoaded = true
    })
  }
}
