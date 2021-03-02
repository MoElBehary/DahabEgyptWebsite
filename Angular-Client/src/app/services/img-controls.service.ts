import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ImgControlsService {
  imageFile
  renderedIMG
  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) { }
  // [?] Redirect imgs coms from input file to asets file
  solvImgURL(imgPath) { //<CALL> 
    let imgName = imgPath.replace(/.*[\/\\]/, '');
    let solvedPath = imgName
    if (!imgName) return false;
    return solvedPath;
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.renderedIMG = reader.result;
      reader.readAsDataURL(file);
    }
  }
  // [?] uplading images
  selectImage(event, inpV) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.imageFile = file;
      // this.selectedTopic.topic_image = inpV
    }
  }
  // [?] upload image to the server
  // postCategImg() {
  //   const formData = new FormData();
  //   formData.append('file', this.imageFile);

  //   this.blogTopics_service.uploadImg(formData).subscribe(
  //     res => {
  //       this.renderedIMG = this.blogTopics_service.getUrl(res.filename)
  //       // this.imgName = res.filename

  //     },
  //     err => { console.log(err) }
  //   )
  // }
}
