import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogTopicsService {
  _url = environment.apiBaseUrl +"/blog-topics";
  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) { }
  // [?] (GET) get All Topics
  getTopics() {
    return this.http.get(this._url)
  }
  // [?] get Topic by :id
  getSelectedTopic(id) {
    return this.http.get(this._url + '/' + id)
  }
  //[?] (POST) Create Topic
  createTopic(newTopic) {
    return this.http.post(this._url, newTopic)
  }
  // [?] (PUT) udpate Topic
  updateTopic(id, updatedTopic) {
    return this.http.put(this._url + '/' + id, updatedTopic)
  }
  //[?] (DELETE) delete Topic
  deleteTopic(id) {
    return this.http.delete(this._url + '/' + id)
  }
  // [?] check if there is an :id param in the route or not
  checkTopicIDParam() {
    let paramId = this.activeRoute.root.firstChild.snapshot.params['id'];
    if (paramId) { // [?] if there is an :id 
      return paramId
    } else {
      return false
    }
  }
  // [#] IMGS
  uploadImg(img) {
    return this.http.post<any>(this._url + '/img', img)
  }
  getUrl(fileName) {
    return `${this._url}/img/${fileName}`
  }
  deleteImage(imgName) {
    return this.http.delete(this._url + '/img/' + imgName)
  }
}
