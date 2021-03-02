import { Component, OnInit, ViewChild} from '@angular/core';
import { BlogTopicsService } from '../services/blog-topics.service'
import { BlogTagsService } from '../services/blog-tags.service'
import {Router} from '@angular/router'
import { BlogUserCommentsComponent } from '../blog-user-comments/blog-user-comments.component'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-topic',
  templateUrl: './blog-topic.component.html',
  styleUrls: ['./blog-topic.component.css']
})
export class BlogTopicComponent implements OnInit {
  @ViewChild(BlogUserCommentsComponent) comments_component: BlogUserCommentsComponent
  selectedTopicID; //[?] topic id
  selectedTopic; //[?] topic full object
  selectedTopicTag; //[?] Topic Tag full object
  topics; //[?] All Topics
  selectedTagTopics = []; // all topics in the slected tag
  // ---
  nextPrevTopics = [];
  nextTopic;
  prevTopic;
  topicsByTag; //[?] topics by selected tag
  // ---
  isLoaded = false;
  loadedTopics = false
  constructor(
    public blog_topics_service: BlogTopicsService,
    private blog_tags_service: BlogTagsService,
    private router: Router,
    private activeRouter: ActivatedRoute
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
    holderWindowSize('#blogTopicHolder')
    // [?] param check for (:id) & set (selectedTopicID) to this (:id)
    this.blog_topics_service.checkTopicIDParam() ? this.selectedTopicID = this.blog_topics_service.checkTopicIDParam() : this.selectedTopicID = null
    // [?] DATA
    this.getSelectedTopic()
  }
// [#] Controllers
  // [?] filter all topics by one tag
  filterTopicsByTag(){
    this.selectedTagTopics = [];
    let tagID = this.selectedTopicTag._id
    for(let topic of this.topics){
      let topicTagID = topic.topic_tag
      if(topicTagID === tagID){
        this.selectedTagTopics.push(topic)
      }
    }
    this.repositionTopic(this.indexSelectedTopicFromTagTopicsList(this.selectedTopic._id))
    this.nextPrevTopics = this.selectedTagTopics.slice(1, 4) //[?] first show one
    this.setPreAndNextV()
  }
  // [?] return the selected topic index of all topics in the same tag
  indexSelectedTopicFromTagTopicsList(selectedTopicID){
    let topicsIDs = []
    for (let topic of this.selectedTagTopics){
      topicsIDs.push(topic._id)
    }
    return topicsIDs.indexOf(selectedTopicID)
  }
  // [?] repositioning the selected topic
  repositionTopic(startIndex) {
    let cuts = this.selectedTagTopics.splice(startIndex, this.selectedTagTopics.length - startIndex)
    this.selectedTagTopics = cuts.concat(this.selectedTagTopics)
  }
  shift3Topics(selectedTopicID, ope) {
    let topicIndex = this.indexSelectedTopicFromTagTopicsList(selectedTopicID)
    switch(ope){
      case 'n':
        if (this.stopShifting() !== 'next'){
          this.nextPrevTopics = this.selectedTagTopics.slice(topicIndex + 1, topicIndex + 4)
        }
        break
      case 'p':
        if (this.stopShifting() !== 'prev') {
          if ((topicIndex - 4) <= 0){
            this.nextPrevTopics = this.selectedTagTopics.slice(1, 4)
          }else{
            this.nextPrevTopics = this.selectedTagTopics.slice(topicIndex -  3, topicIndex)
          }
        }
        break
    }    
    this.setPreAndNextV()
  }
  stopShifting(){
    if (this.nextTopic._id === this.selectedTagTopics[this.selectedTagTopics.length-1]._id){
      return 'next'
    }
    if (this.prevTopic._id === this.selectedTagTopics[1]._id){
      return 'prev'
    }
  }
  setPreAndNextV(){
    this.nextTopic = this.nextPrevTopics[this.nextPrevTopics.length - 1]
    this.prevTopic = this.nextPrevTopics[0]
  }
  clickTopic(topic){
    let id = topic._id
    this.selectedTopicID = id
    this.router.navigateByUrl('/blog/' + id);
    this.getSelectedTopic()
    this.comments_component.getTopicComments(this.selectedTopicID)
  }
// [#] HTTP REQ
  // [?] selected topic
  getSelectedTopic(){
    this.blog_topics_service.getSelectedTopic(this.selectedTopicID).subscribe(res=>{
      this.selectedTopic = res;
    },err =>{

    },()=>{
        this.getSelectedTopicTag()
    })
  }
  // [?] selected Tag
  getSelectedTopicTag(){
    this.blog_tags_service.getSelectedTag(this.selectedTopic.topic_tag).subscribe(res=>{
      this.selectedTopicTag = res;
    },err=>{

    }, () => { 
      this.getAllTopic()
      this.isLoaded = true
    })
  }
  // [?] all topics
  getAllTopic(){
    this.blog_topics_service.getTopics().subscribe(res=>{
      this.topics = res
      
    }, err => { }, () => { this.filterTopicsByTag()})
  }
}
