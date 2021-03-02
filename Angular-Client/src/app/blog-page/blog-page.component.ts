import { Component, OnInit } from '@angular/core';
import { BlogTopicsService } from '../services/blog-topics.service'
import { BlogTagsService } from '../services/blog-tags.service'
import { BlogCommentsService } from '../services/blog-comments.service'

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  topics;
  tags;
  tagName = 'All';
  comments;
  topicsIDs = [];
  sortedHotTopics = [];
  hotTopics;
  topicsAndCommentsCounter = []; //[?] topics ids without Repetition
  hotTopicsKey = false
  selectedTopicsByTag = null;
  searchValue;
  constructor(
    public blog_topics_service : BlogTopicsService,
    private blog_tag_service: BlogTagsService,
    private blog_comments: BlogCommentsService
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
    holderWindowSize('#blogPageHolder')
    // [?] getData
    this.getAllTopics()
    this.getHotTopics()
    this.getAllTags()
    this.getAllComments()
  }
  // [?]
  selectAllTags() {
    this.tagName = 'All'
    this.selectedTopicsByTag = null;
  }
  // [?] filter bar select tag
  selectTag(id, name) {
    this.selectedTopicsByTag = [];
    // this.selectedTagID = id
    this.tagName = name
    for (let topic of this.topics) {
      if (topic.topic_tag == id) {
        this.selectedTopicsByTag.push(topic)
      }
    }
  }
  styleTagBtns(btn) {
    $("[data-btn='tag-btn']").removeClass('s-selected-tag-btn')
    $(btn).addClass('s-selected-tag-btn')
  }
  // [?]
  sortData() {
    return this.hotTopics.sort((a, b) => {
      return <any>new Date(b.updated_at) - <any>new Date(a.updated_at);
    });
  }
  // [#] HTTP REQs
  // [?] get all topics
  getAllTopics(){
    this.blog_topics_service.getTopics().subscribe(res=>{
      this.topics = res;
    },err=>{}, ()=>{
    })
  }
  // [?] get Hot topics 
  //! this is bullshit
  getHotTopics(){
    this.blog_topics_service.getTopics().subscribe(res=>{
      this.hotTopics = res;
    },err=>{}, ()=>{
      this.sortData()
        this.hotTopicsKey = true
    })
  }
  // [?] get all tags
  getAllTags(){
    this.blog_tag_service.getTags().subscribe(res=>{
      this.tags = res
    })
  }
  // [?] get all comments 
  getAllComments(){
    this.blog_comments.getcomments().subscribe(res=>{
      this.comments = res
      for(let comment of this.comments){
        this.topicsIDs.push(comment.topic_id)
      }
     
    },err=>{},()=>{
    })
  }
}
