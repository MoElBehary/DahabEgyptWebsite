import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Product, ProductColor, ProductSideImgs } from "../../../model/admin-product-color.model"
import {trigger, state, style, animate, transition} from '@angular/animations';
import { ActivatedRoute } from '@angular/router'
import { ProductsService } from '../../../services/products.service';
import { ImgControlsService } from 'src/app/services/img-controls.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

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
  selector: 'app-product-color',
  templateUrl: './product-color.component.html',
  styleUrls: ['./product-color.component.css'],
  animations: [
    trigger('fade',[
      state('void', style({
        opacity : 0
      })),
      transition('void => *', animate('2000ms ease-out'))
    ])
  ]
})
export class ProductColorComponent implements OnInit {
  // ==================================================
  // {=========={([@] Main Vars)}==========}
  // ==================================================
  // { prod_color: 'red', prod_images: [{ prod_side_img: "assets/imgs/products/allProducts/laya-clode-WfDj_DWZpHA-unsplash.jpg" }] } //TODO Test
  productColors = [];
  sideImge;
  selectedColorBtn;
  selectedColorBtnIndex = 0;
  HoverColorBtnIndex;
  HoverSideImgeShowBoxIndex;
  selectedSideImgeDelBtn;
  mainImage ; //todo
  pageLoad : boolean =false;
  @Output() prod_colors = new EventEmitter();
  @Output() prod_mainImage = new EventEmitter();
  // fadeMe;
  constructor(
    public pro_service: ProductsService,
    private router: ActivatedRoute,
    private img_service: ImgControlsService,
    public progress_service: ProgressBarService
  ) { }
  imageFile
  ngOnInit() {
    //[?] check if it is new product or come from database
    let startUp = ()=>{
      if (!this.pro_service.checkProductIDParam()){
       this.startNew()
      }
    }
    startUp()
  }
  // ==================================================
  // {=========={([@] Tools )}==========}
  // ==================================================
  // [?] Redirect imgs coms from input file to asets file
  solvImgURL(imgPath) { //<CALL> (reDirectSideImagePath)
    let imgName = imgPath.replace(/.*[\/\\]/, '');
    let imgsFolder = 'imgs/products/allProducts'
    let solvedPath = `assets/${imgsFolder}/${imgName}`
    if (!imgName) return false;
    return solvedPath;
  }
  //[?] send product colors as output
  outputProductColors(){
    // for (let productColor of this.productColors){
    //   let index = this.productColors.indexOf(productColor)
    //   jQuery.isEmptyObject(productColor) ? this.productColors.splice(index,1): true;
    // }
    this.prod_colors.emit(this.productColors)
  }
  outPutProductMainInage(){
    this.prod_mainImage.emit(this.mainImage)
  }
  isLoaded(){//<CALL> //TODO
    this.pageLoad = true
  }
  inputProductColorsById(inputProductColors){
    this.productColors = inputProductColors;
    this.isLoaded()
    // [?] select first color button
    this.selectColorBtnAuto()
  }
  // ==================================================
  // {=========={([@] view )}==========}
  // ==================================================
  // [# view] || ================================================== |({product color})| ===START=== 
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] set New color Button
  newColor(btn) {//<CALL> DOM (click) on { Color Input}
    let colorIndex = $("[data-type='color-btn']").get().indexOf(btn)
    if (!this.productColors[colorIndex].prod_color){
      this.generateProColor($(btn).val())
    }
  }
  // [?] generate new product color object in color array
  generateProColor(pickerValue) {//<CALL> (newColor)
    //[?] push side imges object array
    let sideImgs = this.productColors[this.productColors.length-1].prod_images = []
    let newProductSideImg = new ProductSideImgs;
    sideImgs.push(newProductSideImg)
    //[?] push color object
    this.productColors[this.productColors.length - 1].prod_color = pickerValue
    let newProcutColor = new ProductColor
    this.productColors.push(newProcutColor)
    return true;
  }
  // [?] change prod_color value in color object
  pickColor(productColor, pickerValue) {//<CALL> DOM (change) on { Color Input}
    productColor.prod_color = pickerValue
  }
  //[?] fadeIn Animations
  fadInColor(btn) { //<CALL> DOM (change) on { file Input}
    let colorBTN = $(btn).parent()[0];
    $(colorBTN).addClass('animated fadeIn')
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# view] || ================================================== |product color| ---END---
  ////////////
  // [# view] || ================================================== |{(product Side Image)}| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] set new side image showBox
  newSideImg(event, sideImgeInp) {//<CALL> DOM (change) on { file Input}
    let sideImgeIndex = $("[data-type='side-img-inp']").get().indexOf(sideImgeInp)
    if (!this.productColors[this.selectedColorBtnIndex].prod_images[sideImgeIndex].prod_side_img){
      this.generateProSideImge(event, $(sideImgeInp).val());
    }
  }
  // [?] generate new product side image object in array 
  generateProSideImge(event, sideImge) {//<CALL> (newSideImg)
    let sideImgsArray = this.productColors[this.selectedColorBtnIndex].prod_images;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imageFile = file
      const reader = new FileReader();
      const formData = new FormData();
      if (this.imageFile) {
        formData.append('file', this.imageFile);
        this.pro_service.uploadImg(formData).subscribe(
          res => {
          }, err => {
            console.log(err)
          },
          () => {
            reader.onload = e => {
              sideImgsArray[sideImgsArray.length - 1].prod_side_img = file.name
              let newProductSideImg = new ProductSideImgs;
              sideImgsArray.push(newProductSideImg)
            }
            reader.readAsDataURL(file);
          }
        )
      }
    }
  }
  // [?] update side image
  updateSideImage(event, oldSideImage ){
    this.pro_service.deleteImage(oldSideImage.prod_side_img).subscribe(res=>{})
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imageFile = file
      const reader = new FileReader();
      const formData = new FormData();
      if (this.imageFile) {
        formData.append('file', this.imageFile);
        this.pro_service.uploadImg(formData).subscribe(
          res => {
          }, err => {
            console.log(err)
          },
          () => {
            reader.onload = e => {
              oldSideImage.prod_side_img = file.name
              this.setMainImage()
            }
            reader.readAsDataURL(file);
          }
        )
      }
      
  
    }
  }
  //[?] fadeIn Animations
  fadInSideImg(inp) { //<CALL> DOM (change) on { file Input}
    let sideImgBox = $(inp).parent()[0];
    $(sideImgBox).addClass('animated fadeIn')
  }
  setMainImage(){
    if (!$.isEmptyObject(this.productColors[0])) {
      this.mainImage = this.productColors[0].prod_images[0].prod_side_img
    }else{
      this.mainImage = undefined
    }
    this.outPutProductMainInage()
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# view] || ================================================== |product Side Image| ---END---
  // ==================================================
  // {=========={([@] Controllers )}==========}
  // ==================================================
  // [# Controllers] || ================================================== |({product color})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] setup for new product 
  startNew(){
    // [?] push color object at colors array //*~
    let newProcutColor = new ProductColor
    this.productColors.push(newProcutColor)
    this.isLoaded()
    // [?] select first color button
    this.selectColorBtnAuto()
  }
  //[?] store selected color btn
  selectColorBtn(btn) {//<CALL> DOM (click) on { Color Input}
    this.selectedColorBtn = btn 
    this.selectedColorBtnIndex  = $("[data-type='color-btn']").get().indexOf(btn)
  }
  //[?] select color Button after delete one
  selectColorBtnAuto() {//<CALL> (deleteColor) && ngOnInit
    //[?] dont select the + color button if + button is the next selection and if there is more buttons , select the Previous button
    if (!this.productColors[this.selectedColorBtnIndex].prod_color) {
      if (this.productColors.length > 1) {
        this.selectedColorBtnIndex -= 1;

      } else {
        this.selectedColorBtnIndex = 0;
        return;
      }
    }
    // TODO
    //  else {
    //   this.selectedColorBtnIndex = this.selectedColorBtnIndex
    // }
      setTimeout(()=>{
      this.selectedColorBtn = $("[data-type='color-btn']").get()[this.selectedColorBtnIndex]
      this.selectedColorBtn.click()
    },200)
  }
  //[?] store hoverd color button
  HoverColorBtn(btn) {//<CALL> DOM (mouseenter) on { Color Input}
    this.HoverColorBtnIndex = $("[data-type='color-btn']").get().indexOf(btn)
  }
  //[?] remove hovered color button
  deHoverColorBtn() {//<CALL> DOM (mouseleave) on { Color Input}
    this.HoverColorBtnIndex = undefined
  }
  //[?] delete color Main Function
  deleteColor() {//<CALL> DOM (click) on {Delete Color Button}
      this.deleteColorObj()
    // [?] set product main image
    this.setMainImage()
    this.selectColorBtnAuto()
  }
  //[?] delete color object
  deleteColorObj() {//<CALL> (deleteColor)
    let position = this.selectedColorBtnIndex;
    let imgs = this.productColors[position].prod_images
    for (let img of imgs){
      this.pro_service.deleteImage(img.prod_side_img).subscribe(res => { })
    }
    this.productColors.splice(position,1)
  }
  //[?] rest product color array to create new product
  resetForAddNew(){
    this.productColors = []
    this.startNew()
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# Controllers] || ================================================== |product color| ---END---
  ////////////
  // [# Controllers] || ================================================== |{(product Side Image)}| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] store hoverd side image div showBox
  HoverSideImage(imgBox) {//<CALL> DOM (mouseenter) on { side image div}
    this.HoverSideImgeShowBoxIndex = $("[data-type='side-image-showBox']").get().indexOf(imgBox);
  }
  //[?] remove hovered side image div showBox
  deHoverSideImage() {//<CALL> DOM (mouseleave) on { side image div}
    this.HoverSideImgeShowBoxIndex = undefined
  }
  //[?] store side image delete button
  showDeleteSideImageBtn(sideImageDelBtn) {//<CALL> DOM (mouseenter) on { side image delete button}
    this.selectedSideImgeDelBtn = sideImageDelBtn
  }
  //[?] remove stored side image delete button
  hideDeleteSideImageBtn() { //<CALL> DOM (mouseleave) on { side image delete button}
    this.selectedSideImgeDelBtn = undefined
  }
  // [?] delete side image 
  deleteSideImage(position){
    let sideImgsArray = this.productColors[this.selectedColorBtnIndex].prod_images
    this.pro_service.deleteImage(sideImgsArray[position].prod_side_img).subscribe(res => { })
    sideImgsArray.splice(position, 1)
    // [?] set product main image
    // let mainImage = this.productColors[0].prod_images[0].prod_side_img
    this.setMainImage()
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# Controllers] || ================================================== |product Side Image| ---END---
  // [#] HTTP REQ
  postImg() {
    this.progress_service.startLoading()
    const formData = new FormData();
    if (this.imageFile) {
      formData.append('file', this.imageFile);

      this.pro_service.uploadImg(formData).subscribe(
        res => {
          this.progress_service.setSuccess()
          res == true
          this.progress_service.completeLoading()  
        }, err => {
          this.progress_service.setError()
          console.log(err)
          this.progress_service.completeLoading()
        },
        () => {
        }
      )
    }
  }
}
