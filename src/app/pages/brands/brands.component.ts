import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';

@Component({
  imports: [],
  selector: 'app-brands',
  styleUrl: './brands.component.scss',
  templateUrl: './brands.component.html',
})
export class BrandsComponent implements OnInit{
  private readonly brandsService = inject(BrandsService)

  brands:WritableSignal<Ibrands[]> = signal([])

  ngOnInit(): void {
    this.getBrandsData();
  }

  getBrandsData():void{
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res)
        this.brands.set(res.data)
      }
    })
  }
}
