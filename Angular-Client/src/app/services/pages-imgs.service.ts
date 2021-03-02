import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesImgsService {
  images
  imgURL
  _url = environment.apiBaseUrl +"/pages";
  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) { }
  uploadImg(img) {
    return this.http.post<any>(this._url + '/img', img)
  }
  getUrl(fileName) {
    return `${this._url}/img/${fileName}`
  }
  deleteImage(imgName){
    return this.http.delete<any>(this._url + '/img/' + imgName)
  }
}
