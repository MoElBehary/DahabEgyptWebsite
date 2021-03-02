import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogTagsService } from '../../../services/blog-tags.service'
import { NotificationsComponent } from '../../../notifications/notifications.component'
@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.css']
})
export class AdminTagsComponent implements OnInit {
  tags;
  deleBtnHoverd = true;
  @ViewChild(NotificationsComponent) notify_component: NotificationsComponent;
  constructor(private blogTags_service: BlogTagsService) { }

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
    holderWindowSize('#blogTagsHolder')
    this.getAllTags()
  }
  // Controllers
  // [?]
  targetTagInp(tagInp){
    $(tagInp).focus();
  }
  showDeleteBtn(delBtn){
    this.deleBtnHoverd ? $(delBtn).css('right', '-90%') : false;
  }
  HideDeleteBtn(delBtn){
    this.deleBtnHoverd ? $(delBtn).css('right', '-100%') : false;
  }
  fullSizeDeleBtn(delBtn){
    this.deleBtnHoverd ? $(delBtn).css('right', '-50%') : false;
  }
  clickedDeleBtn(delBtn, tagBox){
    this.deleBtnHoverd = false
    $(delBtn).css('right', '200%');
    setTimeout(() => { this.hideTagBox(tagBox)},50)
    setTimeout(() => { this.deleBtnHoverd = true},500)
  }
  hideTagBox(tagBox){
    $(tagBox).css("opacity", 0)
  }
  emptyNewBtnTag(newBtn){
    $(newBtn).val('')
  }
  // DATA
  // [?] 
  getAllTags(){
    this.blogTags_service.getTags().subscribe(res=>{
      this.tags = res;
    })
  }
  createNewTag(data) {
    let newTag = {
      tag_name: data,
    }
    this.blogTags_service.createTag(newTag).subscribe(res => {
      this.tags.push(res);
      this.notify_component.notifyMe('alert-primary', '', 'loading') 
    },err => {
      if (err.status == 0) {//[?]  No Internet Connections !
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

      } else {
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

      }
    },
      () => {
        this.notify_component.notifyMe('alert-success', 'Tag is', ' saved !')
      }
    )
  }
  updateTags(index){
    this.blogTags_service.updateTag(this.tags[index]._id, this.tags[index]).subscribe(res=>{
    },
      err => {
        if (err.status == 0) {//[?]  No Internet Connections !
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

        } else {
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

        }
      },
      () => {
        this.notify_component.notifyMe('alert-success', 'Tag is', ' up to date!')

      })
  }
  deleteTag(index, delBtn, tagBox){
    this.blogTags_service.deleteTag(this.tags[index]._id).subscribe(res=>{
      this.clickedDeleBtn(delBtn, tagBox)
    }, err => {
      if (err.status == 0) { //[?]  No Internet Connections !
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

      } else {
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

      }
      console.log(err)
    },()=>{
        this.notify_component.notifyMe('alert-danger', 'Tag is', ' Deleted !')
        setTimeout(() => { this.tags.splice(index, 1)},200)
    })
  }
}
