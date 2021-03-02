import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BlogTopicsService } from '../../../services/blog-topics.service';
import { BlogTagsService } from '../../../services/blog-tags.service';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  topics;
  tags;
  tagName = 'All';
  selectedTopicsByTag = null;
  selectedTagID;
  searchValue;
  @Output() clickTopicEvent =  new EventEmitter()
  @Output() createOneEvent =  new EventEmitter()
  constructor(
    public blogTopics_service: BlogTopicsService,
    private blogTags_service: BlogTagsService
  ) { }

  ngOnInit() {
    this.getAllTopics()
    this.getAllTags()
  }
  getAllTopics(){
    this.blogTopics_service.getTopics().subscribe(res=>{
      this.topics = res;
    })
  }
  getAllTags(){
    this.blogTags_service.getTags().subscribe(res=>{
      this.tags = res;
    })
  }
  // [#] controllers
  // [?] fire (@Output()) Event to parent component to navigate
  clickTopic(topicID){
    this.clickTopicEvent.emit(topicID)
  }
  createOneOutPut(){
    // this.createOneEvent.emit(this.selectedTagID)
    this.createOneEvent.emit()
  }
  // [?] filter bar select tag
  selectTag(id , name){
    this.selectedTopicsByTag = [];
    this.selectedTagID = id
    this.tagName = name
    for(let topic of this.topics){
      if (topic.topic_tag == id){
        this.selectedTopicsByTag.push(topic)
      }
    }
  }
  selectAllTags(){
    this.tagName = 'All'
    this.selectedTopicsByTag = null;
  }
  selectAllTagBTN(){
    $('#allTagsBtn').click()
  }
  styleTagBtns(btn){
    $("[data-btn='tag-btn']").removeClass('s-selected-tag-btn')
      $(btn).addClass('s-selected-tag-btn')
  }
}
