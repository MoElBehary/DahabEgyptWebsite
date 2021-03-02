import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { CategoryModel } from '../../../model/admin-category.model';
import { ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { CategoryModalComponent } from '../category-modal/category-modal.component'
import { SubCategoriesComponent } from '../sub-categories/sub-categories.component'
import { ImgControlsService } from 'src/app/services/img-controls.service';
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
  selector: "app-categories-panel",
  templateUrl: "./categories-panel.component.html",
  styleUrls: ["./categories-panel.component.css"],
  encapsulation: ViewEncapsulation.None // to reade css classes on dynamic elements
})
export class CategoriesPanelComponent implements OnInit {
  allCategories;
  categories = [];
  category = new CategoryModel ;
  // [?] grid system 
  rowS = Array(0).fill(0);
  columS = Array(0).fill(0);
  colSwitchCounter = 0
  @ViewChild(CategoryModalComponent) category_modal: CategoryModalComponent;
  @ViewChild(SubCategoriesComponent) sub_category: SubCategoriesComponent;

  constructor(
    public categ_service : CategoriesService,
    private _router : Router,
    private cdRef: ChangeDetectorRef
    // public img_service: ImgControlsService
    ){}
  ngOnInit() {
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
    holderWindowSize('#categorieHolder')
    // [?] get all categories
    this.getAllCategories()
  }
  // {=========={([@] CONTROL )}==========}
  // [# CONTROL] || ================================================== |({Category})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  startNew(){
    // [?] push color object at colors array //*~
    let newcategory = new CategoryModel
    this.categories.push(newcategory)
    // this.rowS = Array(+1).fill(+1)
    // this.columS = Array(+1).fill(+1);
  }
  openModal(id){
    this.category_modal.openModal(id)
  }
  // [?] sub categories change for every category
  showSubCategOfCateg(categ){
    this.category_modal.showSubCategOfCateg(categ)
  }
 
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# CONTROL] || ================================================== |Category| ---END---
  // {=========={([@] DATA )}==========}
  // [# DATA] || ================================================== |({Category})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  categoryData(){
    let newCateg = new CategoryModel;
    newCateg.categ_name = 'Mohamed',
    newCateg.categ_image = 'yo.png'
    return newCateg
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# DATA] || ================================================== |Category| ---END---
  // {=========={([@] HTTP REQuests )}==========}
  // [# HTTP REQuests] || ================================================== |({Category Controllers})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] get all categories
  getAllCategories() {//<CALL> ngOnInit
    this.categ_service.getCategories().subscribe(res=>{
      this.allCategories = res;
      this.categories = this.allCategories
    },
    err=>{

    },
    ()=>{
        this.startNew();
      console.log(this.categories)
    })
  }
  //[?] //TODO
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# HTTP REQuests] || ================================================== |Category Controllers| ---END---
}
