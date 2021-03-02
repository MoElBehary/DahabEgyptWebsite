import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../services/contact.service'
import { WhatsappMenuComponent } from '../whatsapp-menu/whatsapp-menu.component'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isLoaded = false
  data;
  @ViewChild(WhatsappMenuComponent) whatsapp_menu: WhatsappMenuComponent;
  constructor(private contact_service: ContactService) { }

  ngOnInit() {
    window.addEventListener("resize", ()=> {
      resizeContentHolder();
      closeMapResize()
    });
    //resize the content holder and map window to fit the window height size
    function resizeContentHolder() {
      var innerHeightWithoutNav = window.innerHeight - 56;
      $("#contactHolder").css("min-height", innerHeightWithoutNav);
      $('.s-contact-map').css('height', innerHeightWithoutNav -20)
    }
    // close map
    function closeMap(){
      $('#contactMap').animate({
        left: - ($('#contactMap').width() - 80)
      })
    }
    function closeMapResize() {
      var dT = $('#toggleMapBtn').attr('data-toggle');
      switch(dT){
        case 'false':
          $('#contactMap').css({
            left: 0
          })
          break;
        case 'true':
          $('#contactMap').css({
            left: - ($('#contactMap').width() - 80)
          })
          break;
      }
    }
    // on load at ther realtime
    resizeContentHolder();
    closeMap();
    this.getdata();
  }
  openWhatsappMenu(){
    this.whatsapp_menu.openMenu()
  }
  // open and close map by click event
  toggleMap(btn){
    $('#contactMap').stop(true,true)
    var dT = $(btn).attr('data-toggle');
    switch(dT){
      // {{Open}}
      case 'true':
        this.animateBtn(btn, 'arrow-left',.4 , 'rounded-right s-opc-5', 'rounded-left' ,0)
        $('#contactMap').animate({
          left : '0'
        })
        $(btn).attr('data-toggle','false')
        break;
      // {{Close}}
      case 'false':
        this.animateBtn(btn, 'arrow-right',0, 'rounded-left', 'rounded-right s-opc-5' ,'26px')
        $('#contactMap').animate({
          left: - ($('#contactMap').width() - 80)
        })
        $(btn).attr('data-toggle', 'true')
        break;
    }
  }
  // map btn animation
  animateBtn(btn, img, shadow, removeClass, addClass, margin ){
    $(btn).css({
      "background-image": "URL(assets/Icons/contact-icons/"+img+".png)",
      "box-shadow": "-3px 0px 2px 0px rgba(34, 34, 34,"+shadow+ ")",
      "margin-left": margin
    })
    $(btn).removeClass(removeClass),
    $(btn).addClass(addClass)
  }
  // [?]
  getdata(){
    this.contact_service.getSections().subscribe(res=>{
      this.data = res
    },err=>{},()=>{
      this.isLoaded = true
        this.map()
    })
  }
  // [?] get map from data and set it for iframe
  map(){
    $('#frameMap').attr('src', this.data[0].map_location )
  }
}
