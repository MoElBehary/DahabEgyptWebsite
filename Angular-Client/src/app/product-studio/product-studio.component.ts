import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
@Component({
  selector: 'app-product-studio',
  templateUrl: './product-studio.component.html',
  styleUrls: ['./product-studio.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', animate('2000ms ease-out'))
    ])
  ]
})
export class ProductStudioComponent implements OnInit, AfterViewInit {
  xs = [1,2,3,4,5]
  isLoaded = false
  product;
  category;
  productColorImages;
  mainImage;
  selectedColorIndex;
  selectedColorBox =0;
  selectedImageBox =0;
  constructor(
    public prod_service: ProductsService,
    private _route: Router,
    private categ_service: CategoriesService
    ) { }

  ngOnInit() {
    window.addEventListener("resize", function () {
      resizeContentHolder();
    });
    // [?] resize the content container holder to fit the window height size
    function resizeContentHolder() {
      var innerWidth = window.innerWidth;
      var innerHeightWithoutNav = window.innerHeight - 56;
      if (innerWidth < 992) {
        $("#productsHolder").css("height", "auto");
      } else {
        if (innerHeightWithoutNav > 700) {
          $("#productsHolder").css("height", innerHeightWithoutNav);
        } else {
          $("#productsHolder").css("height", 700);
        }
      }
    }
    // [?] on load at ther realtime
    resizeContentHolder();
    this.getProdId()
  }
  ngAfterViewInit(){
    // setTimeout(() => { this.prodSliderBoxSwitcher()},200)
  }
  // [?] view product slider box with a clasess
  prodSliderBoxSwitcher() {//<CALL> (ngAfterViewInit)
    let boxs = $('[data-target-box]')
    let removeAllBoxsClasses = (boxs) => {
       boxs.removeClass(`
       rounded-left rounded-right 
       s-prod-slider-box-1 s-prod-slider-box-2 s-prod-slider-box-3 s-prod-slider-box-4 s-prod-slider-box-5
       order-0 order-1 order-2 order-3 order-4
       `)
      }
    removeAllBoxsClasses(boxs)
    for (let box of boxs){
      let boxPosition = $(box).attr('data-target-box')
      switch (boxPosition){
        case '0' :
          $(box).addClass('s-prod-slider-box-1 order-0 rounded-left')
          break;
        case '1':
          $(box).addClass('s-prod-slider-box-2 order-1')
          break;
        case '2':
          $(box).addClass('s-prod-slider-box-3 order-2')
          break;
        case '3':
          $(box).addClass('s-prod-slider-box-4 order-3')
          break;
        case '4':
          $(box).addClass('s-prod-slider-box-5 order-4 rounded-right')
          break;
      }
    }
  }
  //[?]//TODO
  selectProdBox(boxx){
    let allBoxs = $('[data-target-box]')
    let index = 2
    for(let box of allBoxs){
      if(index > 4){
        index = 0
        $(box).attr('data-target-box', index)
      }else{
        $(box).attr('data-target-box', index)
      }
      index++
    }
    this.prodSliderBoxSwitcher()
  }
   // {=========={([@] Controllers )}==========}
  // [# Controllers] || ================================================== |({product Controllers})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] select product color
  selectColor(index){
    this.selectedColorIndex = index;
    this.productColorImages = this.product.prod_colors[index].prod_images
    this.mainImage = this.product.prod_colors[index].prod_images[0].prod_side_img
    this.selectedSideImage(0)
  }
  // [?] select product images color
  selectImage(imageIndex){
    this.mainImage = this.product.prod_colors[this.selectedColorIndex].prod_images[imageIndex].prod_side_img
  }
  //[?] view selected class for color
  selectedColor(index){
    this.selectedColorBox =  index
  }
  // [?] view selected class for side image
  selectedSideImage(index){
    this.selectedImageBox = index
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# Controllers] || ================================================== |product Controllers| ---END---
  // {=========={([@] HTTP REQuests )}==========}
  // [# HTTP REQuests] || ================================================== |({product Controllers})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] get product by id 
  getProdId(){
    let id = this.prod_service.checkProductIDParam() //[?] check the parameter
    this.prod_service.getSelectedProduct(id).subscribe(res=>{
      this.product = res;
      this.productColorImages = this.product.prod_colors[0].prod_images
      this.mainImage = this.product.prod_colors[0].prod_images[0].prod_side_img
      this.selectedColorIndex = 0;
    },err=>{},
    ()=>{
      this.getCategById()
    }
    )
  }
  getCategById(){
    let categId = this.product.prod_category;
    this.categ_service.getSelectedCategories(categId).subscribe(res=>{
      this.category = res;
    },err=>{},
    ()=>{
      this.isLoaded = true
    })
  }
    //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# HTTP REQuests] || ================================================== |product Controllers| ---END---
}