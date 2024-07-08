import { Component, OnDestroy } from '@angular/core';
import { AddBlogPostsRequest } from '../models/add-blogPosts-request.model';
import { BlogPostsService } from '../services/blog-posts.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../login/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css']
})
export class AddBlogPostComponent implements OnDestroy{
  model: AddBlogPostsRequest;
  private addBlogPostsSubscription?: Subscription;

  constructor(private loginService: LoginService, private toastr: ToastrService, private datePipe: DatePipe, private router: Router, private blogPostService: BlogPostsService){
    this.model ={
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date().toLocaleString(),
      author: '',
      isVisible: false
    };
  }

  onFormSubmit() {
    console.log(this.model);
    const data = {...this.model, isVisible: this.model.isVisible.toString() == "true" ? true : false}

    this.addBlogPostsSubscription = this.blogPostService.addBlogPosts(data)
    .subscribe({
      next: (response) => {
        this.router.navigate(['/admin/blogposts']);
        console.log('This was successful!');
      },
      error: (response) => {
        if(response.status == 401)
          this.loginService.logoutClick();
        this.toastr.error('You session has expired! \rPlease login again.', 'Info');
      }
    })
  }

  ngOnDestroy(): void {
    this.addBlogPostsSubscription?.unsubscribe();
  }

}
