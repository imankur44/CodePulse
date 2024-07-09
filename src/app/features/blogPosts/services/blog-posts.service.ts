import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {GetBlogPostRequest} from '../../blogPosts/models/get-blogPosts-request.model';
import { AddBlogPostsRequest } from '../models/add-blogPosts-request.model';
import { DeleteBlogPostRequest } from '../models/delete-blogPosts-request.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {

  deleteBlogPost(model: DeleteBlogPostRequest): Observable<boolean> {
    return this.http.delete<boolean>('http://localhost:5154/api/blogPosts/'+ model.id);
  }

  constructor(private http: HttpClient) { }

  getBlogPosts(): Observable<GetBlogPostRequest[]> {
    return this.http.get<GetBlogPostRequest[]>('http://localhost:5154/api/blogPosts');
  }

  addBlogPosts(model: AddBlogPostsRequest): Observable<void>{
    return this.http.post<void>('http://localhost:5154/api/BlogPosts', model);
  }
}
