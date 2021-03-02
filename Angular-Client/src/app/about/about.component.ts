import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ɵangular_packages_platform_browser_platform_browser_k } from '@angular/platform-browser';
import { AboutService } from '../services/about.service'
import { ContactService } from '../services/contact.service'
import { WhatsappMenuComponent } from '../whatsapp-menu/whatsapp-menu.component'
import { PagesImgsService } from '../services/pages-imgs.service';
@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  @ViewChild(WhatsappMenuComponent) whatsapp_menu: WhatsappMenuComponent;
  aboutSections;
  // setTimeOut function
  hashSwitcher;
  // content title array
  content = ["history", "mission", "vission"] // ?add here to add a new section;
  // contentSection
  contentSection = this.content[0];
  // reset hash for resize and scroller on off switcher
  resetHashONOFF;
  constructor(
    private about_service: AboutService,
    private contact_service: ContactService,
    public pagesImgs_service: PagesImgsService
    ) {}
  socialMedia
  isLoaded
  ngOnInit() {
    // on load
    resizeContentHolder();
    // winodw {{RESIZE}} event
    window.addEventListener("resize", function() {
      resizeContentHolder();
      resetHash();
    });
    // window {{ scroll }} event
    $("#aboutHolder").on("scroll", e => {
      var st = $("#aboutHolder").scrollTop();
      var sections = $("section");
      for (var section of sections) {
        if (
            $(section).offset().top < window.pageYOffset + 62 &&
            $(section).offset().top + $(section).height() >
            window.pageYOffset + 62
        ) {
            //get section id
            var id = $(section).attr("id");
            // reset hash for resize and scroller on off switcher {{TRUE}}
            this.resetHashONOFF = true;
            // switch controller {{dots}} change dots to the selected dot
            for (var cont of this.content) {
              switch (cont) {
                case id:
                  var index = this.content.indexOf(cont);
                  this.dataContentAt(index);
                  this.contentSection = cont;
              }
            }
          }
      }
     
    });
    //resize the content container holder to fit the window height size
    function resizeContentHolder() {
      var innerHeightWithoutNav = window.innerHeight - 56;
      if (innerHeightWithoutNav > 700) {
        $("#contentHolder").css("height", innerHeightWithoutNav);
      } else {
        $("#contentHolder").css("height", 700);
      }
    }
    // reset the hash value of the URL
    var resetHash = () => {
      // if window scrolled little bet, the {{resetHashONOFF}} will be true to make it = #, and back it to the section id to set the section on the write place  
      if (this.resetHashONOFF == true) {
        window.location.hash = "#";
        this.resetHashONOFF = false;
      }
      window.location.hash = "#" + this.contentSection;
    };
    resetHash();
    this.getAllSections()
    this.getdata()
  }
  openWhatsappMenu() {
    this.whatsapp_menu.openMenu()
  }
  //stop the animations
  stopAnimation() {
    $(
      "[data-section=image], [data-section=title], [data-section=article]"
    ).stop(true, false);
    clearTimeout(this.hashSwitcher);
  }
  // Content data switcher
  contentSwitcher(contentSection) {
    this.stopAnimation();
    // select the section elements from the DOM
    // image
    $("[data-section=image]")
      .fadeOut(600)
      .fadeIn(1000);
    // title
    $("[data-section=title]")
      .fadeOut(600)
      .fadeIn(400);
    // article
    $("[data-section=article]")
      .fadeOut(600)
      .fadeIn(800);
    //pass the hash name
    this.hashSwitcher = setTimeout(function() {
      window.location.hash = "#" + contentSection;
    }, 600);
  }
  // up and down sliders buttons
  upAndDownSlider(btn) {
    var contentSectionIndex = $(btn).attr("data-content-at");
    var selectedBtn = btn.id;
    switch (selectedBtn) {
      // Slide Up
      case "onUpSlider":
        if (contentSectionIndex <= 0) {
          contentSectionIndex = this.content.length - 1;
        } else {
          contentSectionIndex--;
        }
        break;
      // Slide Down
      case "onDownSlider":
        if (contentSectionIndex >= this.content.length - 1) {
          contentSectionIndex = 0;
        } else {
          contentSectionIndex++;
        }
        break;
    }
    // select the content section name from the {{content}} array to pass it to the {{ contentSwitcher() }}
    this.contentSection = this.content[contentSectionIndex];
    // change the data at
    this.dataContentAt(contentSectionIndex);
    this.contentSwitcher(this.contentSection);
  }
  //save the section index number to the sliders buttons
  dataContentAt(contentSectionIndex) {
    $("#onUpSlider").attr("data-content-at", contentSectionIndex);
    $("#onDownSlider").attr("data-content-at", contentSectionIndex);
    // give opacity to the selected section {{dot button}}
    this.dotsOpt(contentSectionIndex);
  }
  // switch content with dots buttons
  sectionsBtns(btn) {
    var contentSectionIndex = $(btn).attr("data-Content");
    this.contentSection = this.content[contentSectionIndex];
    this.dataContentAt(contentSectionIndex);
    this.contentSwitcher(this.contentSection);
  }
  // dots opacity
  dotsOpt(contentSectionIndex) {
    // switch the value to string
    var toStr = String(contentSectionIndex);
    var children = $("#contentControllers").children();
    for (var chi of children) {
      var dots = $(chi).attr("data-content");
      switch (dots) {
        case toStr: // the selected section
          $(chi).removeClass("s-opc-5");
          break;
        default:
          // all sections without the selection
          $(chi).addClass("s-opc-5");
      }
    }
  }
  // {=========={([@] HTTP REQuests )}==========}
  // [# HTTP REQuests] || ================================================== |({Sections Controllers})| ===START===
  //:::|:::|:::|:::|:::|:::|:::|:::|:::|
  // [?] get all sections
  getAllSections() {
    this.about_service.getSections().subscribe(res => {
      this.aboutSections = res;
    },err=>{},()=>{
    })
  }
  // [?] get contacts data (Sochial Media)
  getdata() {
    this.contact_service.getSections().subscribe(res => {
      this.socialMedia = res[0].contact_info.socialMedia
    }, err => { }, () => {
      this.isLoaded = true
    })
  }
}
