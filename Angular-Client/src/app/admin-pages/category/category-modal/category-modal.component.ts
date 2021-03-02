import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { CategoryModel } from '../../../model/admin-category.model';
import { NotificationsComponent } from '../../../notifications/notifications.component'
import { SubCategoriesComponent } from '../sub-categories/sub-categories.component';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
//[?] for uploading image
import { ImgControlsService } from 'src/app/services/img-controls.service';
@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
  selectedCategory;
  @Output() refrishCategories = new EventEmitter
  @ViewChild(NotificationsComponent) notify_component: NotificationsComponent;
  @ViewChild(SubCategoriesComponent) sub_categ_component: SubCategoriesComponent;
  
  constructor(
    private categ_service: CategoriesService,
    public progress_service: ProgressBarService
    ) { }
    //[?] uploading image vars
    images
    imgURL
    imgName
  ngOnInit() {
    // [?] when modal is closed
    // $('#categModal').on('hidden.bs.modal', e=> {
    //   this.removeModalContent('categNameInp', 'categImageInp')
    //   console.log('here')
    // })
  }
  // [?] open category Modal 
  openModal(id){
    id ? this.getCategoryById(id) : this.removeModalContent('categNameInp', 'categImageInp')
    $('#modalOpenBtn').click()
  }
  // [?] open subCateg modal
  openSubCategMenu(categName) { //<CALL> DOM HTML sub category btn (click) event
    this.sub_categ_component.openModal(categName);
  }
  // [?] get sub categories of a category
  showSubCategOfCateg(categ) { //<CALL> DOM HTML (click) event {Sub Categories} button
    this.sub_categ_component.showSubCategOfCateg(categ)
  }
  // ==================================================
  // {=========={([@] Tools )}==========}
  // ==================================================
  // [?] remove modal content
  removeModalContent(nameInp, imageInp){//<CALL> HTML DOM (click) event save btn & cancel btn
    setTimeout(()=>{
      this.selectedCategory = undefined
      this.imgURL = undefined
      this.imgName = undefined
      $(nameInp).val('')
      $(imageInp).val('')
      $('#resetForm').click()

    }, 200)
  }
  refrishCategoriesFun(){
    this.refrishCategories.emit()
  }
  // [?] uplading images
  selectImage(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0]
      this.images = file;
    }
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgURL = reader.result;

      reader.readAsDataURL(file);
    }
  }
  // {=========={([@] DATA )}==========}
  // [# DATA] || ================================================== |({Category})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] category data
  categoryData(name, image) {//<CALL> (postNewCategory) && (updateCategory)
    let newCateg = new CategoryModel;
    newCateg.categ_name = name
    newCateg.categ_image = image
    newCateg.sub_categories = this.sub_categ_component.subCategories;
    return newCateg
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# DATA] || ================================================== |Category| ---END---
  // {=========={([@] HTTP REQuests )}==========}
  // [# HTTP REQuests] || ================================================== |({Category Controllers})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] upload image to the server
  postCategImg() {
    this.progress_service.startLoading()
    const formData = new FormData();
    formData.append('file', this.images);

    this.categ_service.uploadImg(formData).subscribe(
      res => {
        this.progress_service.setSuccess()
        this.imgURL = this.categ_service.getUrl(res.filename)
        this.imgName = res.filename
        this.progress_service.completeLoading()
      },
      err => {
        this.progress_service.setError()
        console.log(err) 
        this.progress_service.completeLoading()
      },
      ()=>{
      }
    )
  }
  // [?] post New Category
  postNewCategory(name, image) {//<CALL> DOM HTML saveButton 
    let imgPath = this.categ_service.solvImgURL(image)
    let newCateg = this.categoryData(name, imgPath)
    this.categ_service.createCategories(newCateg).subscribe(res => {
    },
    err=>{
      if (err.status == 0) {//[?]  No Internet Connections !
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

      } else {
        this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

      }
    },
    ()=>{
      this.notify_component.notifyMe('alert-success', 'Category is', ' saved !')
      this.refrishCategoriesFun()
    })
  }
  // [?] get category by Id
  getCategoryById(id){
    this.categ_service.getSelectedCategories(id).subscribe(res=>{
      this.selectedCategory = res;
      this.imgURL = this.categ_service.getUrl(this.selectedCategory.categ_image)
    })
  }
  // [?] udapte Category
  updateCategory(id, name, image, imgName){
    let imgPath;
    let updatedCategory;
    if (image) { // if the file input value = image
      this.categ_service.deleteImage(imgName).subscribe(res => { })
      imgPath = this.categ_service.solvImgURL(image)
      updatedCategory = this.categoryData(name, imgPath);
    }else{
      imgPath = this.selectedCategory.categ_image
      updatedCategory = this.categoryData(name, imgPath);
    }
    this.categ_service.updateCategories(id, updatedCategory).subscribe(res=>{
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
      this.notify_component.notifyMe('alert-success', 'Category is', ' up to date!')
      this.refrishCategoriesFun()
    })
  }
  deleteCategory(id, imgName){
    this.progress_service.startLoading()
    // [?] delete img
    this.categ_service.deleteCategories(id).subscribe(
      res=>{
        this.progress_service.setSuccess()
        res == true;
        this.progress_service.completeLoading()
      },
      err=>{
        this.progress_service.setError()
        if (err.status == 0) { //[?]  No Internet Connections !
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' No Internet Connections !')

        } else {
          this.notify_component.notifyMe('alert-danger', 'Sorry,', ' Please try again !')

        }
        this.progress_service.completeLoading()
      },
      ()=>{
        this.notify_component.notifyMe('alert-danger', 'Category is', ' Deleted !')
        this.categ_service.deleteImage(imgName).subscribe(res => { 
        })
        this.refrishCategoriesFun()
      }
    )
  }
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [# HTTP REQuests] || ================================================== |Category Controllers| ---END---
}
