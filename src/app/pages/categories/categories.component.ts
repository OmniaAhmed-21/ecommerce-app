import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-categories',
  styleUrl: './categories.component.scss',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService=inject(CategoriesService)
  
  categories:WritableSignal<Icategory[]> = signal([])

  ngOnInit(): void {
    this.getAllcategoryData()
  }

  getAllcategoryData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res)
        this.categories.set(res.data);
      }
    })
  };
}
