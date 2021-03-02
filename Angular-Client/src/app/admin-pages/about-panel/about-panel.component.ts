import { Component, OnInit, ViewChild } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { AboutSectionModel } from '../../model/admin-about-model'
import { NotificationsComponent } from '../../notifications/notifications.component'
import { PagesImgsService } from 'src/app/services/pages-imgs.service';
import { ImgControlsService } from 'src/app/services/img-controls.service';
@Component({
  selector: 'app-about-panel',
  templateUrl: './about-panel.component.html',
  styleUrls: ['./about-panel.component.css']
})
export class AboutPanelComponent implements OnInit {
  aboutSections;
  imageFile = []
  @ViewChild(NotificationsComponent) notify_component: NotificationsComponent;
  constructor(
    private about_service: AboutService,
    private pagesImg_service: PagesImgsService,
    private img_service: ImgControlsService
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
    holderWindowSize('#aboutHolder')
    this.getAllSections()
  }
  // ==================================================
  // {=========={([@] Tools )}==========}
  // ==================================================
  // [?] Redirect imgs coms from input file to asets file
  // [?] uplading images
  selectImage(event, inp, index) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.imageFile[index] = file;
      $(inp).val(this.img_service.solvImgURL(event.target.value));
    }
  }
  // {=========={([@] Controlers )}==========}
  // [# Controlers] || ================================================== |({Sections})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] image file function
  sectionImage(inp){
    $(inp).click()
  }
  // [?] save
  clickSave(){
    $('[data-id=saveBtn]').click()
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# Controlers] || ================================================== |Sections| ---END---
  // {=========={([@] DATA )}==========}
  // [# DATA] || ================================================== |({Sections})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] section data
  sectionData(title, image, art) {
    let sectionModel = new AboutSectionModel;
    sectionModel.page_title = title;
    sectionModel.page_article =  art;
    sectionModel.page_backgroundImage =  image;
    return sectionModel
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# DATA] || ================================================== |Sections| ---END---
  // {=========={([@] HTTP REQuests )}==========}
  // [# HTTP REQuests] || ================================================== |({Sections Controllers})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] get all sections
  getAllSections(){
    this.about_service.getSections().subscribe(res=>{
      this.aboutSections = res;
      console.log(this.aboutSections)
    })
  }
  // [?] upload image to the server
  postCategImg(index) {    
    const formData = new FormData();
    if (this.imageFile[index]){
      formData.append('file', this.imageFile[index]);

      this.pagesImg_service.uploadImg(formData).subscribe(
        res => {
          this.pagesImg_service.deleteImage(this.aboutSections[index].page_backgroundImage).subscribe(res=>{})
        }, err => {
          console.log(err)
        },
        () => {
          this.getAllSections()
          this.imageFile = [];
        }
      )
    }
  }
  // [?] update seciton data 
  updateSectionContent(id, title, image, art, index ){
    let data = this.sectionData(title, image, art);
    this.about_service.updateSection(id, data).subscribe(res=>{
    },
      err => {
        if (err.status == 0) {//[?]  No Internet Connections !
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

        } else {
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

        }
      },
      () => {
        this.notify_component.notifyMe('alert-success', 'Section is', ' up to date!')
      })
  }
    //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# HTTP REQuests] || ================================================== |Sections Controllers| ---END---
}
