import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogCommentsService {
  _url = environment.apiBaseUrl + "/blog-comments";
  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) { }
  // [?] (GET) get All comments
  getcomments() {
    return this.http.get(this._url)
  }
  // [?] get Comment by :the main topic id
  getSelectedComment(topicId) {
    return this.http.get(this._url + '/' + topicId)
  }
  //[?] (POST) Create Comment
  createComment(newComment) {
    return this.http.post(this._url, newComment)
  }
  // [?] (PUT) udpate Comment
  updateComment(id, updatedComment) {
    return this.http.put(this._url + '/' + id, updatedComment)
  }
  //[?] (DELETE) delete Comment
  deleteComment(id) {
    return this.http.delete(this._url + '/' + id)
  }
}
