import { Component, OnInit } from '@angular/core';
import { GetBlogPostRequest } from '../models/get-blogPosts-request.model';
import { BlogPostsService } from '../services/blog-posts.service';
import { LoginService } from '../../login/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.css']
})
export class BlogPostListComponent implements OnInit {

  blogPosts: GetBlogPostRequest[] = [];
  rowIndexes: number[]= [];

  constructor(private loginService: LoginService, private toastr: ToastrService, private blogPostService: BlogPostsService){}

  ngOnInit() {
    this.getBlogPosts();
  }

  getBlogPosts(): void {
    this.blogPostService.getBlogPosts().subscribe(blogPosts => {
      this.blogPosts = blogPosts;
      this.CalculateRowIndexes();
    },
    error => {
      if(error.status == 401)
        this.loginService.logoutClick();
      this.toastr.error('You session has expired! \rPlease login again.', 'Info');
      this.blogPosts = []; // Or set to a default state
    });
  }

  CalculateRowIndexes() {
    const listCount = this.blogPosts.length * 3; // Multiply by 3 for 3 columns per row
    const rowCount = Math.ceil(listCount / 3); // Assuming 3 columns per row
    this.rowIndexes = Array.from({ length: rowCount }, (_, index) => index);
  }
  
  deleteBlogPost(model: GetBlogPostRequest) {
      this.blogPostService.deleteBlogPost(model).subscribe({
        next: (response) => {
          this.getBlogPosts();
          console.log('This was successful!');
        },
        error: (response) => {
          console.log('This was not successful!');
        }
      })
    }
}
