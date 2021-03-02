import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter'
// 
import { NgxSummernoteModule } from 'ngx-summernote';
// components
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesPanelComponent } from './admin-pages/category/categories-panel/categories-panel.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductPanelComponent } from './admin-pages/product/product-panel/product-panel.component';
import { ProductColorComponent } from './admin-pages/product/product-color/product-color.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductMenuComponent } from './admin-pages/product/product-menu/product-menu.component';
import { CategoryModalComponent } from './admin-pages/category/category-modal/category-modal.component';
import { ProductStudioComponent } from './product-studio/product-studio.component';
import { HomeComponent } from './home/home.component';
import { SubCategoriesComponent } from './admin-pages/category/sub-categories/sub-categories.component';
import { AdminPanelComponent } from './admin-pages/admin-panel/admin-panel.component';
import { AdminNavComponent } from './admin-pages/admin-nav/admin-nav.component';
import { HomePanelComponent } from './admin-pages/home-panel/home-panel.component';
import { AboutPanelComponent } from './admin-pages/about-panel/about-panel.component';
import { ContactPanelComponent } from './admin-pages/contact-panel/contact-panel.component';
import { FooterComponent } from './footer/footer.component';
import { ProductPageComponent } from './admin-pages/product-page/product-page.component';
import { CategoryPageComponent } from './admin-pages/category-page/category-page.component';
import { AdminTagsComponent } from './admin-pages/blog/admin-tags/admin-tags.component';
import { BlogComponent } from './admin-pages/blog/blog.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogTopicComponent } from './blog-topic/blog-topic.component';
import { NgProgressModule } from 'ngx-progressbar'
// servicess
import { GeneralService} from './services/general.service';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { BlogTagsService } from './services/blog-tags.service';
import { BlogCommentsService } from './services/blog-comments.service';
import { AboutService } from './services/about.service';
import { ContactService } from './services/contact.service';
import { ProductPageService } from './services/product-page.service';
// login
// components
import { UserComponent } from './login/user/user.component';
import { SignUpComponent } from './login/user/sign-up/sign-up.component';
//routes
// import { appRoutes } from './routes';
import { UserProfileComponent } from './login/user-profile/user-profile.component';
import { SignInComponent } from './login/user/sign-in/sign-in.component';
import { UserService } from './login/shared/user.service';
//other
import { AuthGuard } from './login/auth/auth.guard';
import { AuthInterceptor } from './login/auth/auth.interceptor';
import { NewTopicComponent } from './admin-pages/blog/new-topic/new-topic.component';
import { AllComponent } from './admin-pages/blog/all/all.component';
import { BlogUserCommentsComponent } from './blog-user-comments/blog-user-comments.component';
import { LanguagesComponent } from './languages/languages.component';
import { WhatsappMenuComponent } from './whatsapp-menu/whatsapp-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CategoriesComponent,
    ProductsComponent,
    CategoriesPanelComponent,
    AboutComponent,
    ContactComponent,
    ProductPanelComponent,
    ProductColorComponent,
    NotificationsComponent,
    ProductMenuComponent,
    CategoryModalComponent,
    ProductStudioComponent,
    HomeComponent,
    SubCategoriesComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    AdminPanelComponent,
    AdminNavComponent,
    HomePanelComponent,
    AboutPanelComponent,
    ContactPanelComponent,
    FooterComponent,
    ProductPageComponent,
    CategoryPageComponent,
    BlogComponent,
    AdminTagsComponent,
    NewTopicComponent,
    AllComponent,
    BlogPageComponent,
    BlogTopicComponent,
    BlogUserCommentsComponent,
    LanguagesComponent,
    WhatsappMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxSummernoteModule,
    NgProgressModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, ProductsService, CategoriesService, BlogTagsService, AboutService, ContactService, ProductPageService, BlogCommentsService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
