import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: "root"
})
export class ProductsService {
  productFromSearch;
  _url = environment.apiBaseUrl +"/products";
  // _url = "http://rest.learncode.academy/api/learncode/friends";
  constructor(private http: HttpClient, private router: ActivatedRoute) {}
  // [?] (GET) get All products
  getProducts() {
    return this.http.get(this._url)
  }
  // [?] get Product by :id
  getSelectedProduct(id){
    return this.http.get(this._url + '/' + id)
  }
  //[?] (POST) Create Product
  createProduct(newProduct){
    return this.http.post(this._url, newProduct)
  }
  // [?] (PUT) udpate product
  updateProduct(id, updatedProduct){
    return this.http.put(this._url +'/'+ id , updatedProduct)
  }
  //[?] (DELETE) delete product
  deleteProduct(id){
    return this.http.delete(this._url + '/' + id )
  }
  // [?] check if there is an :id param in the route or not
  checkProductIDParam(){
    let paramId = this.router.root.firstChild.snapshot.params['id'];
    if (paramId) { // [?] if there is an :id 
      return paramId
    }else{
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
