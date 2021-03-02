import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  constructor(public searchProd: ProductsService){
    
  }
  ngOnInit(): void {
    $('.navbar-nav>li>a').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });
  }
  // saveSearchV(){
  //   this.searchProd.productFromSearch = 
  // }
  xme(){
    console.log(this.searchProd.productFromSearch)
  }
}
