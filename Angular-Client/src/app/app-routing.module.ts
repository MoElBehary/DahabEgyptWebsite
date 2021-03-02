import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesPanelComponent } from './admin-pages/category/categories-panel/categories-panel.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductPanelComponent } from './admin-pages/product/product-panel/product-panel.component';
import { ProductStudioComponent } from './product-studio/product-studio.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-pages/admin-panel/admin-panel.component';
import { HomePanelComponent } from './admin-pages/home-panel/home-panel.component';
import { AboutPanelComponent } from './admin-pages/about-panel/about-panel.component';
import { ContactPanelComponent }  from './admin-pages/contact-panel/contact-panel.component';
import { ProductPageComponent } from './admin-pages/product-page/product-page.component';
import { CategoryPageComponent } from './admin-pages/category-page/category-page.component';
import { BlogComponent } from './admin-pages/blog/blog.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogTopicComponent } from './blog-topic/blog-topic.component';
// login
import { UserComponent } from './login/user/user.component';
import { SignUpComponent } from './login/user/sign-up/sign-up.component';
import { SignInComponent } from './login/user/sign-in/sign-in.component';
import { UserProfileComponent } from './login/user-profile/user-profile.component';
import { AuthGuard } from './login/auth/auth.guard';
var domainName = "";
if (location.hostname !== "localhost")
  domainName = "";
// import { LanguagesComponent } from './languages/languages.component' //! 4 TEST
const routes: Routes = [
  //users
  { path: domainName + '', component: HomeComponent},
  { path: domainName + "categories", component: CategoriesComponent },
  { path: domainName + "product", component: ProductsComponent },
  // { path: domainName + "product#searchBAR", component: ProductsComponent },
  { path: domainName + "about", component: AboutComponent },
  { path: domainName + "blog", component: BlogPageComponent },
  { path: domainName + "blog/:id", component: BlogTopicComponent},
  { path: domainName + "contact", component: ContactComponent },
  { path: domainName + "product/:id", component: ProductStudioComponent},
  // admins
  { path: domainName + 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: domainName + "admin/categories", component: CategoriesPanelComponent, canActivate: [AuthGuard]},
  { path: domainName + "admin/categories/:id", component: CategoriesPanelComponent, canActivate: [AuthGuard] },
  { path: domainName + "admin/products", component: ProductPanelComponent, canActivate: [AuthGuard] },
  { path: domainName + 'admin/products/:id', component: ProductPanelComponent, canActivate: [AuthGuard] },
  // { path: domainName + "admin/blog", component: BlogComponent, canActivate: [AuthGuard] },
  { path: domainName + "admin/blog/:id", component: BlogComponent, canActivate: [AuthGuard] },
  // { path: domainName + "admin/blog-tags", component: AdminTagsComponent, canActivate: [AuthGuard] },
  { path: domainName + 'admin/home', component: HomePanelComponent, canActivate: [AuthGuard] },
  { path: domainName + 'admin/about', component: AboutPanelComponent, canActivate: [AuthGuard]},
  { path: domainName + 'admin/contact', component: ContactPanelComponent, canActivate: [AuthGuard]},
  { path: domainName + 'admin/product-page', component: ProductPageComponent, canActivate: [AuthGuard]},
  { path: domainName + 'admin/category-page', component: CategoryPageComponent, canActivate: [AuthGuard]},
  // lgoin
  // {
  //   path: 'signup', component: UserComponent,
  //   children: [{ path: '', component: SignUpComponent, canActivate: [AuthGuard]}]
  // },
  { path: domainName + 'admin/signup', component: SignUpComponent, canActivate: [AuthGuard] },
  {
    path: domainName + 'login', component: UserComponent,
    children: [{ path: domainName + '', component: SignInComponent }]
  },
  {
    path: domainName + 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: domainName + '', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
