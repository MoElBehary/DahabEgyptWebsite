import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service'
import { NotificationsComponent } from '../../notifications/notifications.component'
import { VaService } from 'src/app/services/va.service';
@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css']
})
export class HomePanelComponent implements OnInit {
  sectionTitles = ['Video']
  data;
  isloaded = false
  @ViewChild(NotificationsComponent) notify_component: NotificationsComponent
  constructor(
    private home_service: HomeService,
    public va_serv:VaService
    ) { }

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
    holderWindowSize('#homeHolder')
    this.getData()
  }
  getData(){
    this.home_service.getSections().subscribe(res=>{
      this.data = res
    },err=>{},()=>{
        this.isloaded = true
    })
  }
  updateData(){
    this.home_service.updateSection(this.data[0]._id, this.data[0]).subscribe(res=>{

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
}
