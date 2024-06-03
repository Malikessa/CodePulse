import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../add-category/category-request.models';
import { Subscription } from 'rxjs';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit,OnDestroy {

  categories: Category[] = [];

  private getCategoriesSubscription?: Subscription;

  constructor(
    private categoryService: CategoryService
  ){}
  

  ngOnInit():void{
    this.loadCategories();
    
  }

  ngOnDestroy(): void {
    this.getCategoriesSubscription?.unsubscribe();
  }

  loadCategories():void{
    this.getCategoriesSubscription = this.categoryService.getCategories().subscribe({
      next:(categories)=>this.categories=categories,
      error:(err)=>console.error('Failed to load categories',err)
    });
  }

}
