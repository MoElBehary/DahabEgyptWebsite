import { Component, OnInit,ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact.service'
import { NotificationsComponent } from '../../notifications/notifications.component'

@Component({
  selector: 'app-contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.css']
})
export class ContactPanelComponent implements OnInit {
  sectionTitles = ['Map', 'Contacts', 'Emails']
  isloaded = false
  contactSections;
  @ViewChild(NotificationsComponent) notify_component : NotificationsComponent
  constructor(private contact_service: ContactService) { }
  ngOnInit() {
    // [?] resize holder as winodw full size | take (holder) => the selected DOM Element
    let holderWindowSize = (holder) => {// [?] holder is the selected holder <div> fo the component
      // [?] window reisze event | to resize holder every Browser winodw resize
      window.addEventListener("resize", function () {
        resizeContentHolder(holder);
      });
      // [?] resize the content container holder to fit the window height size
      function resizeContentHolder(elem) {
        var innerWidth = window.innerWidth;
        var innerHeightWithoutNav = window.innerHeight - 56;
        if (innerWidth < 992) {
          $(elem).css("min-height", innerHeightWithoutNav);
        } else {
          if (innerHeightWithoutNav > 700) {
            $(elem).css("min-height", innerHeightWithoutNav);
          } else {
            $(elem).css("min-height", 700);
          }
        }
      }
      // [?] on load at ther realtime
      resizeContentHolder(holder);
    }
    holderWindowSize('#contactHolder')
    // [?] get all data
    this.getAllData()
  }
  // [#] controllers
  // [?] refresh any inp and make it empty
  refreshAddInp(addButn) {
    $(addButn).val('')
  }
  // [?#] phone Functions
  createNewCompanyPhoneNum(phoneNum){
    this.contactSections[0].contact_info.phone[this.contactSections[0].contact_info.phone.length] = phoneNum
  }
  updateCompanyPhoneNum(index, value){
    this.contactSections[0].contact_info.phone[index] = value
  }
  deleteCompanyPhoneNum(index){
    this.contactSections[0].contact_info.phone.splice(index, 1)
  }
  // [?#] whatsapp Functions
  createNewWhatsappInp(whatsappNum){
    this.contactSections[0].contact_info.socialMedia[5].whatsapp[this.contactSections[0].contact_info.socialMedia[5].whatsapp.length] = whatsappNum
  }
  deleteWhtsapp(index){
    this.contactSections[0].contact_info.socialMedia[5].whatsapp.splice(index, 1)
  }
  updateWhatsapp(index, value){
    this.contactSections[0].contact_info.socialMedia[5].whatsapp[index] = value
  }
  // {=========={([@] HTTP REQuests )}==========}
  // [# HTTP REQuests] || ================================================== |({Sections Controllers})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] get all sections
  getAllData(){
    this.contact_service.getSections().subscribe(res=>{
      this.contactSections = res
      console.log(this.contactSections)
    }
    ,err=>{},
    ()=>{
      this.isloaded = true;
    }
    )
  }
  updateData(){
    this.contact_service.updateSection(this.contactSections[0]._id,this.contactSections[0]).subscribe(res=>{

    },
      err => {
        if (err.status == 0) {//[?]  No Internet Connections !
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

        } else {
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

        }
      },
      () => {
        this.notify_component.notifyMe('alert-success', 'Page is', ' up to date!')
      })
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# HTTP REQuests] || ================================================== |Sections Controllers| ---END---
}
