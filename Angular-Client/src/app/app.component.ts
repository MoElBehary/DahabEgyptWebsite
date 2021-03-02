import { Component, OnInit } from '@angular/core';
import { UserService } from './login/shared/user.service';
import { ProgressBarService } from './services/progress-bar.service';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dahab';
  constructor(public userService: UserService, public progress_service: ProgressBarService, private progress: NgProgress){}
  ngOnInit(){
    this.progress_service.progressRef = this.progress.ref('progressBar');
    if (this.userService.isLoggedIn()){
      this.userService.isAdmin = true
    }else{
      this.userService.isAdmin = false
    }
  }
}
