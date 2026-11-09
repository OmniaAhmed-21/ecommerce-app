import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CarouselModule,TranslatePipe],
  selector: 'app-details',
  styleUrl: './details.component.scss',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService);
  private readonly productsService = inject(ProductsService)
  private readonly toastrService = inject(ToastrService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  
  detailsProduct:Iproduct|null = null;

  SliderImageProduct: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
    rtl:true
  }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        let productId = p.get('id');
        this.productsService.getSpecificProducts(productId).subscribe({
          next:(res)=>{
            console.log(res.data)
            this.detailsProduct = res.data;
            this.changeDetectorRef.detectChanges();
          }
        })
      }
    })
    
  }

  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status == 'success'){
          this.toastrService.success(res.message, 'fresh cart')
          this.cartService.cartNumber.set(res.numOfCartItems);
        }  
      }

    })
  }

}
