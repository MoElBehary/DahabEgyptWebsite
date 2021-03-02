import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.css']
})
export class ProductMenuComponent implements OnInit {
  products: any;
  productsByCategories:any=[];
  productBySubCateg: any = [];
  categories: any;
  CategoryName: any = 'All'
  searchValue: any; 
  selectedSubCategOfCateg: any;
  // searchedProducts=[];
  prodOrCateg: any = 'Categories'
  @Output() selectProductId = new EventEmitter();
  constructor(
    public pro_service: ProductsService,
    public categ_service: CategoriesService,
    private router: Router
    ) { }
  ngOnInit() {
    $("#exampleModalCenter").on("click", "[data-select=false]", $e => {
      this.selectSubCategBtn($e.target)
    });
    this.getAllProducts()
    this.getAllCategories()

  }
  // [?] add class to selected button
  selectSubCategBtn(btn){
    let btns = $('[data-select=false]');
    for(let btnIn of btns){
      $(btnIn).removeClass("s-sub-categories-selected_btns")
    }
    $(btn).addClass("s-sub-categories-selected_btns")
  }
  refishMenu(){
    // [?] clear search bar
    this.searchValue = undefined
    this.productsByCategories = []
    this.productBySubCateg = [];
    this.CategoryName = 'All'
    this.prodOrCateg = 'Categories'
  }
  openMenu(){
    $('#openMenuBtn').click();
    this.refishMenu()
  }
  getAllProducts(){
    this.pro_service.getProducts().subscribe(res=>{
      this.products = res;
    })
  }
  //[?] send output productId to call () from {{product-panel.component}}
  outputProductId(id){
    this.selectProductId.emit(id)
  }
  switchProdOrCateg(){
    this.prodOrCateg == 'Categories' ? this.prodOrCateg = 'Products' : this.prodOrCateg = 'Categories'
  }
  getAllCategories(){
    this.categ_service.getCategories().subscribe(res=>{
      this.categories = res;
    })
  }
  selectCategory(id, categName){
    this.productBySubCateg = [];
    this.productsByCategories = [];
    this.CategoryName = categName
    for(let product of this.products){
      product.prod_category == id ? this.productsByCategories.push(product): false
    }
    if (this.productsByCategories.length <= 0){
      this.productsByCategories =  undefined
    }
  }
  selectAllCategory(){
    this.CategoryName = 'All'
    this.productsByCategories = [];
  }
  // [?] select sub categories 
  selectSubCategOfCateg(subCategories){
    this.selectedSubCategOfCateg = subCategories
  }
  selectProdsOfSubCateg(subCategories){
    this.productBySubCateg = [];
    if (this.productsByCategories){
      for (let product of this.productsByCategories){
        product.prod_sub_category == subCategories ? this.productBySubCateg.push(product) : false
      }
    }
    if (this.productBySubCateg.length <= 0) {
      this.productBySubCateg = undefined
    }
  }
  // [?] select all sub categories product
  selectAllSubCategories(){
    this.productBySubCateg = []
  }
}