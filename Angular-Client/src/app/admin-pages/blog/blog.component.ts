import { Component, OnInit, ViewChild } from '@angular/core';
import { NewTopicComponent } from './new-topic/new-topic.component'
import { BlogTopicsService } from '../../services/blog-topics.service'
import { AllComponent } from './all/all.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  selectedTab;
  blogState = 'New Topic'
  @ViewChild(NewTopicComponent) new_topic_component: NewTopicComponent
  @ViewChild(AllComponent) all_component: AllComponent

  constructor(private _router: Router, private blogTopics_service: BlogTopicsService ) { }

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
    holderWindowSize('#blogHolder')
    //[?] check if it there an id navigate to topic
    let startUp = () => {
      if (this.blogTopics_service.checkTopicIDParam() !== 'all') {
        this.openUpdateTopic(this.blogTopics_service.checkTopicIDParam())
      }
    }
    startUp()
  }
  stlyeSummerNote(){
    this.new_topic_component.styleSummerNote()
  }
  getAllTags(){
    this.new_topic_component.getAllTags()
  }
  getTopicById(id){
    this.blogTopics_service.getSelectedTopic(id).subscribe(res=>{
      this.new_topic_component.setToUpdate(res)
    })
  }
  refreshAllData(){
    this.all_component.getAllTopics()
    this.all_component.getAllTags()
  }
  navigateToBlogState(){
    this._router.navigateByUrl('/admin/blog/all')
    this.blogState = 'New Topic'
    this.new_topic_component.setToCreateNew()
  }
  // [?]
  openUpdateTopic(topicID){
    this.getTopicById(topicID)
    this._router.navigateByUrl('/admin/blog/' + topicID)
    $('#pills-topic-tab').click()
    this.blogState = 'Update Topic'
  }
  createOne(tagId){
    $('#pills-topic-tab').click()
    this.stlyeSummerNote()
    this.new_topic_component.craeteOneFromTag(tagId)
  }
  resetTagBarAtAll(){
    this.all_component.selectAllTagBTN()
  }
}
