import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesPageService {
  _url = environment.apiBaseUrl +"/category-page";
  data: any;
  userPageData: any
  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) { }
  // [?] (GET) get All Sections
  getSections() {
    return this.http.get(this._url)
  }
  // [?] get Section by :id
  getSelectedSection(id) {
    return this.http.get(this._url + '/' + id)
  }
  //[?] (POST) Create Section
  createSection(newSection) {
    return this.http.post(this._url, newSection)
  }
  // [?] (PUT) udpate Section
  updateSection(id, updatedSection) {
    return this.http.put(this._url + '/' + id, updatedSection)
  }
  //[?] (DELETE) delete Section
  deleteSection(id) {
    return this.http.delete(this._url + '/' + id)
  }
}
