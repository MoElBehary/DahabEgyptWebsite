import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../login/shared/user.service';
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  userName;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userName = res['user'].fullName
      },
      err => {
        console.log(err);

      }
    );
    $('.navbar-nav>li>a').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });
  }
  
  onLogout() {
    this.userService.deleteToken();
    this.userService.isAdmin = false;
    this.router.navigate(['/login']);
  }
}
