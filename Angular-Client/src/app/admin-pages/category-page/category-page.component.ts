import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesPageService } from 'src/app/services/categories-page.service';
import { NotificationsComponent } from 'src/app/notifications/notifications.component';
import { PagesImgsService } from 'src/app/services/pages-imgs.service';
import { ImgControlsService } from 'src/app/services/img-controls.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  sectionTitles = ['Slider', 'Hot']
  isLoaded:boolean = false
  imageFileSlider = [];
  imageFileHot = [];
  data;
  deletingImgs=[]
  @ViewChild(NotificationsComponent) notify_component: NotificationsComponent
  constructor(
    public category_page_service: CategoriesPageService,
    private pagesImg_service: PagesImgsService,
    private img_service: ImgControlsService) { }
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
    holderWindowSize('#categoryHolder')
    this.getData()
  }
  // [#] CONTROLLERS
  // [?] Redirect imgs coms from input file to asets file
  solvImgURL(imgPath) { //<CALL> (reDirectSideImagePath)
    let imgName = imgPath.replace(/.*[\/\\]/, '');
    let imgsFolder = 'imgs/categories'
    let solvedPath = `assets/${imgsFolder}/${imgName}`
    if (!imgName) return false;
    return solvedPath;
  }
  sectionImage(inp) {
    $(inp).click()
  }
  // [?] uplading images
  selectImage(event, index, caseX) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      switch (caseX) {
        case 'slider':
          this.category_page_service.data[0].page_slides[index].slide_image =  this.img_service.solvImgURL(event.target.value);
          this.imageFileSlider[index] = file;
          break;
        case 'hot':
          this.category_page_service.data[0].page_hot_sec[index].box_image =  this.img_service.solvImgURL(event.target.value);
          this.imageFileHot[index] = file;
          break;
      }
    }
  }
  oldImgValue(imgName, index){
    this.deletingImgs[index] = imgName
  }
  deleteImg(){
    for(let img of this.deletingImgs){
      this.pagesImg_service.deleteImage(img).subscribe(res=>{})
    }
  }
  // [#] HTTP REQs
  postImg() {
    let allImages = this.imageFileSlider.concat(this.imageFileHot)
    let count = 0;
    for(let img of allImages){
      const formData = new FormData();
      if (img){
        formData.append('file', img);
        this.pagesImg_service.uploadImg(formData).subscribe(
        res => {
        }, err => {
          console.log(err)
        },
        () => {
          this.imageFileSlider = [];
          this.imageFileHot = [];
          this.deletingImgs = [];
        }
      )
      }
      count++
    }
  }
  getData(){
    this.category_page_service.getSections().subscribe(res=>{
      this.category_page_service.data = res
      this.data = res
    },err=>{},()=>{this.isLoaded= true})
  }
  updateData() {
    this.category_page_service.updateSection(this.category_page_service.data[0]._id, this.category_page_service.data[0]).subscribe(res => {

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
