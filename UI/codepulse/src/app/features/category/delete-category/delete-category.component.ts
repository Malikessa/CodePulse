import { Component } from '@angular/core';
import { UpdateCategoryRequest } from '../edit-category.models';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
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
    private router : Router
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

  onConfirm(): void {
    // Add your deletion logic here
    this.categoryService.deleteCategory(this.model.id).subscribe(() => {
      this.router.navigate(['/admin/categories']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/categories']);
  }

}
