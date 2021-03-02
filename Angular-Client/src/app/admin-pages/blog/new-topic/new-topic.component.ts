import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BlogTopicsService } from '../../../services/blog-topics.service'
import { BlogTagsService } from '../../../services/blog-tags.service'
import { BlogTopicModel } from '../../../model/blog-topics.model'
import { NotificationsComponent } from '../../../notifications/notifications.component'
import { ImgControlsService } from 'src/app/services/img-controls.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {
  isLooded = false
  tap = true;
  topics;
  topicState = true
  selectedTopic = new BlogTopicModel;
  selectedTopicID;
  newTopic = new BlogTopicModel;
  tags;
  selectedTagID;
  selectedTag;
  config = {
    placeholder: 'Type your topic here...',
    tabsize: 2,
    height: '330px'
  }
  @Output() topicIsDel = new EventEmitter()
  @ViewChild(NotificationsComponent) notify_component: NotificationsComponent;
  constructor(
    private blogTopics_service: BlogTopicsService,
    private blogTags_service: BlogTagsService,
    private img_service: ImgControlsService,
    public progress_service: ProgressBarService
    ) { }
  imageFile
  renderedIMG
  oldImg
  ngOnInit() {
    this.getAllTopics();
    this.getAllTags()
  }
  // [#] tools
  // [#] Controllers
  toogleTopicTaps(){
    this.tap ? this.tap = false : this.tap = true
  }
  styleSummerNote(){
    $('.note-toolbar').css({
      'background': 'white',
      'border' : 'none'
    })
    $('.note-editor.note-airframe, .note-editor.note-frame').css('border', 'none')
    $('.note-btn').css({
      'border': 'none'
    })
    $('.note-icon-caret').css('display', 'none')
    $('.note-editor').css({
      'z-index': 4000
    })
    $('.note-resizebar').css('display','none')
    $('.note-statusbar').css('border','none')
  }
  // [img]
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.renderedIMG = reader.result;
      reader.readAsDataURL(file);
    }
  }
  // [?] uplading images
  selectImage(event, inpV) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.imageFile = file;
      this.selectedTopic.topic_image = inpV
    }
  }
  // [?] upload image to the server
  postCategImg() {
    this.progress_service.startLoading()
    const formData = new FormData();
    formData.append('file', this.imageFile);

    this.blogTopics_service.uploadImg(formData).subscribe(
      res => {
        this.progress_service.setSuccess()
        this.renderedIMG = this.blogTopics_service.getUrl(res.filename)
        this.progress_service.completeLoading()

      },
      err => {
        this.progress_service.setError()
         console.log(err) 
        this.progress_service.completeLoading()
        }
    )
  }
  selectMe(tagId){
    this.selectedTagID = tagId
  }
  // [?] set all input values to the selected topic
  setToUpdate(topic){
    this.topicState = false
    this.selectedTopicID = topic._id
    this.selectedTopic = topic
    this.oldImg = topic.topic_image
    this.renderedIMG = this.blogTopics_service.getUrl(topic.topic_image)
    this.selectedTagID = topic.topic_tag;
    this.getSelectedTag(topic.topic_tag)
    $('.summernote').summernote('code', topic.topic_content)
    this.styleSummerNote();
  }
  // [?]
  setToCreateNew(){
    this.topicState = true
    this.selectedTopicID='';
    this.selectedTopic = new BlogTopicModel
    this.selectedTagID='';
    this.selectedTag;
    this.renderedIMG =''
    $('#topicNameInp').val('')
    $('.summernote').summernote('code','')
    this.styleSummerNote();
  }
  // [?]
  outPutTopicIsDel(){
    this.topicIsDel.emit()
  }
  // [?] create one from tag that is no topics at it
  craeteOneFromTag(tagId) {
    this.selectedTopic.topic_tag = tagId
  }
  // [#] Data
  $newTopic(){
    this.newTopic.topic_name = $('#topicNameInp').val()
    this.newTopic.topic_image = this.img_service.solvImgURL(this.selectedTopic.topic_image)
    this.newTopic.topic_tag = this.selectedTagID
    this.newTopic.topic_content = $('.summernote').summernote('code')
    // var plainText = $(htmlContent).text();
    return this.newTopic;
  }
  // [#] HTTP Reqs
  getAllTopics(){
    this.blogTopics_service.getTopics().subscribe(res=>{
      this.topics = res
    })
  }
  createNewTopic(){
    let data = this.$newTopic();
    this.blogTopics_service.createTopic(data).subscribe(res=>{
    }, err => {
      if (err.status == 0) {//[?]  No Internet Connections !
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

      } else {
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

      }
    },
      () => {
        this.notify_component.notifyMe('alert-success', 'Topic is', ' Published !')
      })
  }
  // [?]
  getAllTags() {
    this.blogTags_service.getTags().subscribe(res => {
      this.tags = res;
    })
  }
  getSelectedTag(id){
    this.blogTags_service.getSelectedTag(id).subscribe(res=>[
      this.selectedTag = res
    ],err=>{

    },()=>{
      this.isLooded = true
    })
  }
  updateTopic(){
    let data = this.$newTopic();
    this.blogTopics_service.updateTopic(this.selectedTopicID, data).subscribe(res=>{

    }, err => {
      if (err.status == 0) {//[?]  No Internet Connections !
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

      } else {
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

      }
    },
      () => {
        this.blogTopics_service.deleteImage(this.oldImg).subscribe(res => { })
        this.notify_component.notifyMe('alert-success', 'Topic is', ' Up to date !')
      })
  }
  deleteTopic(){
    this.blogTopics_service.deleteTopic(this.selectedTopicID).subscribe(res => {
    }, err => {
      if (err.status == 0) {//[?]  No Internet Connections !
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

      } else {
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

      }
    },
      () => {
        this.blogTopics_service.deleteImage(this.oldImg).subscribe(res => { })
        this.notify_component.notifyMe('alert-danger', 'Topic is', ' Deleted !')
      })
  }
}
