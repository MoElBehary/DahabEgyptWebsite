import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogTagsService {
  _url = environment.apiBaseUrl +"/blog-tags";
  constructor(private http : HttpClient, private activeRoute: ActivatedRoute) { }
  // [?] (GET) get All tags
  getTags() {
    return this.http.get(this._url)
  }
  // [?] get Tag by :id
  getSelectedTag(id) {
    return this.http.get(this._url + '/' + id)
  }
  //[?] (POST) Create Tag
  createTag(newTag) {
    return this.http.post(this._url, newTag)
  }
  // [?] (PUT) udpate Tag
  updateTag(id, updatedTag) {
    return this.http.put(this._url + '/' + id, updatedTag)
  }
  //[?] (DELETE) delete Tag
  deleteTag(id) {
    return this.http.delete(this._url + '/' + id)
  }
}
