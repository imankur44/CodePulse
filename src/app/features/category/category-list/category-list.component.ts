import { Component } from '@angular/core';
import { GetCategoryRequest } from '../models/get-category-request.model';
import { CategoryService } from '../services/category.service';
import { DeleteCategoryRequest } from '../models/delete-category-request.model';
import { LoginService } from '../../login/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  
  categories: GetCategoryRequest[] = [];
  rowIndexes: number[] = [];

  constructor(private toastr: ToastrService, private loginService: LoginService, private categoryService: CategoryService){
  }

  deleteCategory(model: GetCategoryRequest) {
    this.categoryService.deleteCategory(model).subscribe({
      next: (response) => {
        this.getCategories();
        console.log('This was successful!');
      },
      error: (response) => {
        console.log('This was not successful!');
      }
    })
  }
  ngOnInit(): void{
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategory().subscribe(categories => {
      this.categories = categories;
      this.calculateRowIndexes();
    },
    error => {
      if(error.status == 401)
        this.loginService.logoutClick();
      this.toastr.error('You session has expired! \rPlease login again.', 'Info');
      this.categories = []; // Or set to a default state
    });
  }

  calculateRowIndexes(): void {
    const listCount = this.categories.length * 3; // Multiply by 3 for 3 columns per row
    const rowCount = Math.ceil(listCount / 3); // Assuming 3 columns per row
    this.rowIndexes = Array.from({ length: rowCount }, (_, index) => index);
  }
}
