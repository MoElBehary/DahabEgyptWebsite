import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service'

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {
  subCategories = [];
  selectesCategName;
  constructor(
    private categ_srvices: CategoriesService
  ) { }

  ngOnInit() {
  
  }
  //[?] open sub category modal
  openModal(categName) {//<CALL> from <category-modal.component.ts> (openSubCategMenu)
    this.selectCategory(categName)
    $('#modalSubCategOpenBtn').click()
  }
  // [?] close sub category modal
  closeModal(){
    $('#subCateg').modal('hide')
  }
  // [?] selected Category
  selectCategory(categName){
    categName ? this.selectesCategName = categName : this.selectesCategName = undefined ;
  }
  // [?]
  createSubCategories(subCategValue){
    this.subCategories.push(subCategValue)
  }
  // [?] make add button empty
  refrishAddInp(addBtn){ //<CALL> DOM HTML (click)(keyup) events addBtn && addInp
    $(addBtn).val('')
  }
  // [?] update sub categories
  updateSubCategName(index, subCategValue){
    this.subCategories[index] = subCategValue
  }
  //[?] delete sub categories
  deleteSubCateg(index){
    this.subCategories.splice(index,1)
  }
  // [?] show sub categories of selected category
  showSubCategOfCateg(categ) { //<CALL> from <category-modal-component.html> (showSubCategOfCateg)
    categ ? this.subCategories = categ.sub_categories : this.subCategories = []
  }
  xvx(){
    console.log('hi')
  }
}
