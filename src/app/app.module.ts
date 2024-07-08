import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BlogPostListComponent } from './features/blogPosts/blog-post-list/blog-post-list.component'
import { AddBlogPostComponent } from './features/blogPosts/add-blog-post/add-blog-post.component';
import { UserLoginComponent } from './features/login/user-login/user-login.component';
import { CommonModule, DatePipe } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    BlogPostListComponent,
    AddBlogPostComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    CommonModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7125'],
        disallowedRoutes: []
      }
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule {
  
 }
