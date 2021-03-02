import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
// services
import { HomeService } from '../services/home.service'
import { ProductPageService } from '../services/product-page.service'
import { ProductsService } from '../services/products.service'
import { CategoriesService } from '../services/categories.service'
import { AboutService } from '../services/about.service'
import { BlogTopicsService } from '../services/blog-topics.service'
import { PagesImgsService } from '../services/pages-imgs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../products/products.component.css']
})
export class HomeComponent implements OnInit {
  hotProducts
  homeData
  hotProductIsLoaded = false
  allProducts;
  allCategories;
  aboutSections;
  hotTopicsKey = false
  hotTopics;
  constructor(
    private _router: Router,
    private productPage_service: ProductPageService,
    public product_service: ProductsService,
    public pagesImg_service: PagesImgsService,
    public categorie_service: CategoriesService,
    private about_service: AboutService,
    public blog_topics_service: BlogTopicsService,
    private home_service: HomeService
  ) { }

  ngOnInit() {
    this.getHomeData()
    this.getHotProducts()
    this.getAllProducts()
    this.getAllCategories()
    this.getAllSections()
    this.getHotTopics()
  }
  // [#] CONTROLLERs
  setVideo() {
    $('#videoIframe').attr('src', this.homeData[0].page_video + '?rel=0&autoplay=0&controls=0&modestbranding=1&loop=1&autohide=1&showinfo=0')
  }
  // [?] sort array content by date
  sortData(arr) {
    return arr.sort((a, b) => {
      return <any>new Date(b.updated_at) - <any>new Date(a.updated_at);
    });
  }
  // [?] slice from an array 
  sliceData(arr, size){
    arr.splice(size, arr.length)
  }
  // [?] redirect to the selected product
  selectProductById(id) {
    this._router.navigateByUrl('product/' + id)
  }
  selectCategory(id, name, subCateg) {
    this.categorie_service.selectedCategId = { id: id, name: name, subCateg: subCateg }
    this._router.navigateByUrl('product')
  }
  // [#] HTTP REQs
  // [?] get home video
  getHomeData(){
    this.home_service.getSections().subscribe(res=>{
      this.homeData = res
    },err=>{},()=>{
        this.setVideo()
    })
  }
  // [?] get hot prodcuts
  getHotProducts(){
    this.productPage_service.getSections().subscribe(res=>{
      this.hotProducts = res
    }, err => { }, () => { this.hotProductIsLoaded = true})
  }
  // [?] get all products
  getAllProducts(){
    this.product_service.getProducts().subscribe(res=>{
      this.allProducts = res
    },err=>{}, ()=>{
      this.sortData(this.allProducts)
      this.sliceData(this.allProducts, 8)
    })
  }
  // [?] get all categories
  getAllCategories(){
    this.categorie_service.getCategories().subscribe(res=>{
      this.allCategories = res;
    },err=>{}, ()=>{
        this.sortData(this.allCategories)
        this.sliceData(this.allCategories, 4)
    })
  }
  // [?] get all sections
  getAllSections() {
    this.about_service.getSections().subscribe(res => {
      this.aboutSections = res;
    }, err => { }, () => {
    })
  }
  // [?] get Hot topics 
  //! this is bullshit
  getHotTopics() {
    this.blog_topics_service.getTopics().subscribe(res => {
      this.hotTopics = res;
    }, err => { }, () => {
      this.sortData(this.hotTopics)
      console.log(this.hotTopics)
      this.hotTopicsKey = true
    })
  }
}
