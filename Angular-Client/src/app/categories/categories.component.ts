import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service'
import { Router } from '@angular/router'
import { CategoriesPageService } from '../services/categories-page.service';
import { PagesImgsService } from '../services/pages-imgs.service';
@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories;
  isLoaded:boolean = false
  constructor(
    public categ_service: CategoriesService,
    private _router: Router,
    public categ_page_service: CategoriesPageService,
    public pagesImgs_service: PagesImgsService
    ) { }

  ngOnInit() {
    this.getAllCategories()
    this.getPageData()
  }
  // [#] CONTROLLERS
  // [?] compare between the hot sections categories name and the categorie name | of equal => show it in product page
  choseCateg(selectedCategName){
    for (let category of this.categories){
      let categName = category.categ_name
      if (categName === selectedCategName){
        this.selectCategory(category._id, categName, category.sub_categories)
      }else{
        this._router.navigateByUrl('product')
        console.log('here')
      }
    }
  }
  // [#] HTTP REQs
  getAllCategories(){
    this.categ_service.getCategories().subscribe(res=>{
      this.categories = res
    })
  }
  selectCategory(id, name, subCateg){
    this.categ_service.selectedCategId = { id: id, name: name, subCateg: subCateg}
    this._router.navigateByUrl('product')
  }
  selectAllCategory(){
    this.categ_service.selectedCategId = undefined
    this._router.navigateByUrl('product')
  }
  // [?] slider and hot data
  getPageData(){
    this.categ_page_service.getSections().subscribe(res=>{
      this.categ_page_service.userPageData = res
    }, err => { },()=>{this.isLoaded = true})
  }
}
