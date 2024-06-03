import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { UpdateCategoryRequest } from '../edit-category.models';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  model: UpdateCategoryRequest = {
    id: '',
    name: '',
    urlHandle: ''
  };

  private editCategorySubscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      const categoryId = params['id'];
      if (categoryId) {
        this.categoryService.getCategoryById(categoryId).subscribe({
          next: (category) => this.model = category,
          error: (err) => console.error('Failed to load category', err)
        });
      }
    });
  }

  updateCategory(): void {
    this.editCategorySubscription = this.categoryService.updateCategory(this.model)
      .subscribe({
        next: (response) => {
          console.log('Update was successful!');
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          console.error('Failed to update category', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.editCategorySubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
