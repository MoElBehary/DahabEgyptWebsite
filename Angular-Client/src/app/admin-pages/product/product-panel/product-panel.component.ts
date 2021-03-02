// Every single Code down there is BLAH BLAH BLAH :*
import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { Product } from "../../../model/admin-product-color.model";
import { ProductsService } from '../../../services/products.service';
import { ProductColorComponent } from '../product-color/product-color.component'
import { NotificationsComponent } from '../../../notifications/notifications.component'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductMenuComponent } from '../product-menu/product-menu.component'
import { CategoriesService } from '../../../services/categories.service';
/*
  ==================================================
  {=========={(@ Comments Hent)}==========}
  ==================================================
  [@] => Main block comment
  [#] => sub main block comment
  [?] => discription Comment
  <CALL> => functin calling events
*/
@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.css'],
  encapsulation: ViewEncapsulation.None // to reade css classes on dynamic elements
})
export class ProductPanelComponent implements OnInit {
  // ==================================================
  // {=========={([@] Main Vars)}==========}
  // ==================================================
  proColor;
  product = new Product;
  mainImage;
  productStats = 'New';
  notificationsState;
  categories;
  selectedCategory;
  selectedSubCategory;
  constructor(
    public pro_service: ProductsService,
    public categ_service: CategoriesService,
    private router: ActivatedRoute,
    private _router: Router
  ) { }
  @ViewChild(ProductColorComponent) child: ProductColorComponent;
  @ViewChild(NotificationsComponent) notify_component: NotificationsComponent;
  @ViewChild(ProductMenuComponent) productsMenu_component: ProductMenuComponent;
  ngOnInit() {
    // ==================================================
    // {=========={([@] Winodw Event)}==========}
    // ==================================================
    // [?] resize holder as winodw full size | take (holder) => the selected DOM Element
    let holderWindowSize = (holder) => {// [?] holder is the selected holder <div> fo the component
      // [?] window reisze event | to resize holder every Browser winodw resize
      window.addEventListener("resize", function () {
        resizeContentHolder(holder);
      });
      // [?] resize the content container holder to fit the window height size
      function resizeContentHolder(elem) {
        var innerWidth = window.innerWidth;
        var innerHeightWithoutNav = window.innerHeight - 56;
        if (innerWidth < 992) {
          $(elem).css("min-height", innerHeightWithoutNav);
        } else {
          if (innerHeightWithoutNav > 700) {
            $(elem).css("min-height", innerHeightWithoutNav);
          } else {
            $(elem).css("min-height", 700);
          }
        }
      }
      // [?] on load at ther realtime
      resizeContentHolder(holder);
    }
    holderWindowSize('#productsHolder')
    // [?] validate routes 
    this.validateRoutes()
    // [?] get All Categories
    this.getAllCategories()
  }
  // {=========={([@] Controllers )}==========}
  // ==================================================
  // [# Controllers] || ================================================== |({product Controllers})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  //[?] open product menu from productMenu component
  openProductsMenu() {
    this.productsMenu_component.openMenu()
    this.productsMenu_component.getAllProducts()
  }
  resiveProColor($event){
    this.proColor = $event;
  }
  resiveProdMainImage($event){
    this.mainImage = $event
  }
  // [?]
  resetForAddNew(){
    this.child.resetForAddNew()
    this.mainImage = '';
    this.selectedCategory = undefined
    this.selectedSubCategory = undefined
    $('#productNameInp').val('')
    $('#productDescInp').val('')
    $('#costInp').val('')
    $('#costTagInp').val('')
  }
  // [?] validate routes if there is an :id param then call (getProductById)
  validateRoutes(){//<CALL> ngOnInit()
    this.pro_service.checkProductIDParam() ? this.getProductById(this.pro_service.checkProductIDParam()) : false;
    this.pro_service.checkProductIDParam() ? this.productStats = 'Update' : this.productStats = 'New';
  }
  // [?] select category
  selectCategory(category){
    this.selectedCategory = category
    this.selectedSubCategory = null
  }
  //[?] select sub category
  selectSubCategory(subCateg){
    this.selectedSubCategory = subCateg
  }
  // [?] show sub Catgory
  showSubCatgeoryOfProd(){
    this.selectedSubCategory = this.product.prod_sub_category
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# Controllers] || ================================================== |product Controllers| ---END---
  // {=========={([@] HTTP REQuests )}==========}
  // [# HTTP REQuests] || ================================================== |({product Controllers})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] open as a new product
  createNewProductPage(){
    // this._router.navigateByUrl('admin/products')
  }
  // [?] product data
  prodData(pro_name, pro_desc, price, costTag) {// <CALL> (postNewProduct) && (updateProduct)
    let newProduct = new Product;
    this.child.outputProductColors(); // get the product color
    newProduct.prod_name = pro_name;
    newProduct.prod_desc = pro_desc;
    newProduct.prod_colors = this.proColor
    newProduct.prod_category = this.selectedCategory._id
    newProduct.prod_sub_category = this.selectedSubCategory
    newProduct.price = { cost: price, tag: costTag } //TODO
    return newProduct
  }
  // [?] Post New Product
  postNewProduct(pro_name, pro_desc, price, costTag) { //<CALL> DOM (click) Event @ save btn
    let newProduct = this.prodData(pro_name, pro_desc, price, costTag)
    this.pro_service.createProduct(newProduct).subscribe(
      res => {
      this.notify_component.notifyMe('alert-primary', '', 'loading')
      },
      err=>{
        if (err.status == 0) {//[?]  No Internet Connections !
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

        } else {
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

        }
      },
      ()=>{
        this.notify_component.notifyMe('alert-success', 'Product is', ' saved !')
        this.resetForAddNew()
      }
    )
  }
  // [?] get Product By Id
  getProductById(id){
    this.pro_service.getSelectedProduct(id).subscribe(
      res=>{
        this.product.prod_name = res['prod_name']
        this.product.prod_desc = res['prod_desc']
        this.product.prod_category = res['prod_category']
        this.product.prod_sub_category = res['prod_sub_category']
        this.product.prod_colors = res['prod_colors']
        this.product.price = res['price']
        this.product._id = res['_id']
        this._router.navigateByUrl('admin/products/' + id)
      },
      error =>{

      },
      ()=>{
        this.pro_service.checkProductIDParam() ? this.productStats = 'Update' : this.productStats = 'New';
        this.child.inputProductColorsById(this.product.prod_colors) //[?] Send product color to (productColorCompnent)
        this.getCategoryById(this.product.prod_category)
        this.showSubCatgeoryOfProd()
        this.child.setMainImage()
      }
    )
  }
  // [?] get category by id
  getCategoryById(id){
    this.categ_service.getSelectedCategories(id).subscribe(res=>{
      this.selectedCategory = res
    })
  }
  // [?] update product
  updateProduct(pro_name, pro_desc, price, costTag){//<CALL> DOM (click) Event @ update btn
    let updatedProduct = this.prodData(pro_name, pro_desc, price, costTag)
    let id = this.product._id
    this.pro_service.updateProduct(id, updatedProduct).subscribe(res=>{
      this.notify_component.notifyMe('alert-primary','','loading')
    },
    err=>{
      if (err.status == 0) {//[?]  No Internet Connections !
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

      } else {
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

      }
    },
    ()=>{
      this.notify_component.notifyMe('alert-success', 'Product is', ' up to date!')

    }
    )
  }
  // [?] delete product
  deleteProduct(){
    let id = this.product._id
    this.pro_service.deleteProduct(id).subscribe(res => {
      this.notify_component.notifyMe('alert-primary', '', 'loading') 
      }, err => { 
        if (err.status == 0) { //[?]  No Internet Connections !
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')
          
        }else{
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

        }
        console.log(err)
      },() => {
        this.notify_component.notifyMe('alert-danger', 'Product is', ' Deleted !')
        setTimeout(()=>{
          this._router.navigateByUrl('admin/products')
        }, 1000)
    })
  }
  // [?] get All Categories
  getAllCategories(){
    this.categ_service.getCategories().subscribe(res=>{
      this.categories = res
    })
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# HTTP REQuests] || ================================================== |product Controllers| ---END---
}