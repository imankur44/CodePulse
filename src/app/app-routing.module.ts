import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { BlogPostListComponent } from './features/blogPosts/blog-post-list/blog-post-list.component';
import { AddBlogPostComponent } from './features/blogPosts/add-blog-post/add-blog-post.component';
import { UserLoginComponent } from './features/login/user-login/user-login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { 
    path: "", 
    pathMatch: "full", 
    redirectTo: "login" 
  },
  {
    path: 'admin/blogposts',
    component: BlogPostListComponent, canActivate:[AuthGuard]
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogPostComponent, canActivate:[AuthGuard]
  },
  {
    path : 'admin/categories',
    component: CategoryListComponent, canActivate:[AuthGuard]
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent, canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'signup',
    component: UserLoginComponent
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  }, // Redirect to login by default
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
