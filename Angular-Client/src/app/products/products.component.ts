import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { ProductPageService } from '../services/product-page.service';
import { Router } from '@angular/router';
import { PagesImgsService } from '../services/pages-imgs.service';
@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any;
  categories: any;
  searchValue: any;
  productsByCategories: any = [];
  productBySubCateg:any = [];
  selectedSubCategOfCateg:any
  CategoryName:any = 'الكل'
  pageData:any
  isLoaded:any = false;
  // 
  selectedColorIndex;
  productColorImages;
  mainImage;
  product;
  selectedImageBox = 0;
  selectedColorBox = 0;
  constructor(
    public prod_service: ProductsService,
    private categ_service: CategoriesService,
    private prod_page_service: ProductPageService,
    public pagesImgs_service: PagesImgsService,
    private _router: Router
  ) { }
  
  ngOnInit() {
    $("#prodBody").on("click", "[data-select=false]", $e => {
      this.selectSubCategBtn($e.target)
    });
    this.getAllProducts()
    this.getAllCategroies()
    this.getPageData()
  }
  comeFromCategoryPage() {
    if (this.categ_service.selectedCategId) {
      let id = this.categ_service.selectedCategId.id;
      let categName = this.categ_service.selectedCategId.name;
      this.selectedSubCategOfCateg = this.categ_service.selectedCategId.subCateg
      this.selectCategory(id, categName)
    } else {
      this.selectAllCategory()
    }
  }
  getAllProducts() {
    this.prod_service.getProducts().subscribe(res => {
      this.products = res
    },
      err => { },
      () => {
        this.comeFromCategoryPage()
      })
  }
  getAllCategroies() {
    this.categ_service.getCategories().subscribe(res => {
      this.categories = res;
    })
  }
  selectCategory(id, categName) {
    this.productBySubCateg = [];
    this.productsByCategories = [];
    // this.selectSubCategBtn('none')
    this.selectSubCategBtn('#allProdOfSubCateg')
    this.CategoryName = categName
    for (let product of this.products) {
      product.prod_category == id ? this.productsByCategories.push(product) : false
    }
    if (this.productsByCategories.length <= 0) {
      this.productsByCategories = undefined
    }
  }
  selectAllCategory() {
    this.CategoryName = 'All'
    this.productsByCategories = [];
    this.productBySubCateg = [];
    this.selectSubCategBtn('#allProdOfSubCateg')
  }
  selectProductById(id) {
    this._router.navigateByUrl('product/' + id)
  }
  // [?] select sub categories 
  selectSubCategOfCateg(subCategories) {
    this.selectedSubCategOfCateg = subCategories
  }
  // [?] select all sub categories product
  selectAllSubCategories() {
    this.productBySubCateg = []
  }
  selectProdsOfSubCateg(subCategories) {
    this.productBySubCateg = [];
    if (this.productsByCategories) {
      for (let product of this.productsByCategories) {
        product.prod_sub_category == subCategories ? this.productBySubCateg.push(product) : false
      }
    }
    if (this.productBySubCateg.length <= 0) {
      this.productBySubCateg = undefined
    }
  }
  // [?] add class to selected button
  selectSubCategBtn(btn) {
    let btns = $('[data-select=false]');
    for (let btnIn of btns) {
      $(btnIn).removeClass("s-sub-categories-selected_btns")
    }
    $(btn).addClass("s-sub-categories-selected_btns")
  }
  // [?] select product color
  selectColor(index) {
    this.selectedColorIndex = index;
    this.productColorImages = this.product.prod_colors[index].prod_images
    this.mainImage = this.product.prod_colors[index].prod_images[0].prod_side_img
    this.selectedSideImage(0)
  }
  // [?] view selected class for side image
  selectedSideImage(index) {
    this.selectedImageBox = index
  }
  //[?] view selected class for color
  selectedColor(index) {
    this.selectedColorBox = index
  }
  getPageData(){
    this.prod_page_service.getSections().subscribe(res=>{
      this.pageData = res;
      console.log(this.pageData)
    },err=>{},()=>{
        this.isLoaded = true;
    })
  }
}
