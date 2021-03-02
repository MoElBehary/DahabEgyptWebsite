import { Component, OnInit } from '@angular/core';
import { BlogCommentsService } from '../services/blog-comments.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { VaService } from '../services/va.service';

@Component({
  selector: 'app-blog-user-comments',
  templateUrl: './blog-user-comments.component.html',
  styleUrls: ['./blog-user-comments.component.css']
})
export class BlogUserCommentsComponent implements OnInit {
  // [?] vars
  allTopicComments
  constructor(
    private blog_comments_service: BlogCommentsService,
    private activeRouter: ActivatedRoute,
    public va_serv: VaService
    ) { }

  ngOnInit() {
    console.log(this.activeRouter.snapshot.paramMap.get('id'))
    this.getTopicComments(this.activeRouter.snapshot.paramMap.get('id'))
  }
// [#] HTTP REQ
// [?] get comments for a topic
getTopicComments(topicID){
  // this.allTopicComments = []
  this.blog_comments_service.getSelectedComment(topicID).subscribe(res=>{
    this.allTopicComments = res
  }, err => { }, () => { console.log(topicID, this.allTopicComments)})
}
//[?] post A Comment
postComment(userN, mail, content){
  let newComment={
    topic_id: this.activeRouter.snapshot.paramMap.get('id'),
    userName: userN,
    mail: mail,
    comment_content: content
  };
  this.blog_comments_service.createComment(newComment).subscribe(res=>{
    this.allTopicComments.push(res)
  })
}
}
