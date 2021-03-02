import { Component, OnInit } from '@angular/core';

// sorce Code | https://github.com/CodAffection/MEAN-Stack-Login-and-Logout-in-Angular-6-Part-2
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener("resize", function () {
      resizeContentHolder();
    });
    // [?] resize the content container holder to fit the window height size
    function resizeContentHolder() {
      var innerWidth = window.innerWidth;
      var innerHeightWithoutNav = window.innerHeight - 56;
      if (innerWidth < 992) {
        $("#loginFormHolder").css("height", innerHeightWithoutNav);
      } else {
        if (innerHeightWithoutNav > 700) {
          $("#loginFormHolder").css("height", innerHeightWithoutNav);
        } else {
          $("#loginFormHolder").css("height", 700);
        }
      }
    }
    // [?] on load at ther realtime
    resizeContentHolder();
  }

}
