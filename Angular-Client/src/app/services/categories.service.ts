import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  selectedCategId;
  _url = environment.apiBaseUrl +"/categories";
  constructor(private http: HttpClient, private router: ActivatedRoute) { }
  // [?] (GET) get All Categories
  getCategories() {
    return this.http.get(this._url)
  }
  // [?] get Category by :id
  getSelectedCategories(id) {
    return this.http.get(this._url + '/' + id)
  }
  //[?] (POST) Create Category
  createCategories(newCategory) {
    return this.http.post(this._url, newCategory)
  }
  // [?] (PUT) udpate Category
  updateCategories(id, updatedCategory) {
    return this.http.put(this._url + '/' + id, updatedCategory)
  }
  //[?] (DELETE) delete Category
  deleteCategories(id) {
    return this.http.delete(this._url + '/' + id)
  }
  // [?] check if there is an :id param in the route or not
  checkCategoryIDParam() {
    let paramId = this.router.root.firstChild.snapshot.params['id'];
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
  // [?] Redirect imgs coms from input file to asets file
  solvImgURL(imgPath) { //<CALL> 
    let imgName = imgPath.replace(/.*[\/\\]/, '');
    let solvedPath = imgName
    if (!imgName) return false;
    return solvedPath;
  }
}