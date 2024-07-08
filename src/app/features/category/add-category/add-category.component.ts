import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  /**
   *
   */
  constructor(private router:Router, private categoryService: CategoryService) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }

  onFormSubmit() {
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigate(['/admin/categories']);
        console.log('This was successful!');
      },
      error: (response) => {
        console.log('This was not successful!');
      }
    })
}

ngOnDestroy(): void {
  this.addCategorySubscription?.unsubscribe();
}

}
