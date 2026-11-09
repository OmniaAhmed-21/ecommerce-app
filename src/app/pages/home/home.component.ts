import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwhishlist } from '../../shared/interfaces/iwhishlist';


@Component({
  imports: [CarouselModule, RouterLink , TranslatePipe],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit{
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    rtl:true
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true,
    rtl:true
  }
  
  products:WritableSignal<Iproduct[]> = signal([])

  categories:WritableSignal<Icategory[]> = signal([])

  whishlistData:WritableSignal<Iwhishlist[]> = signal([])

  ngOnInit():void{
    this.getproductData();
    this.getAllcategoryData(); 
    this.getwishlistData();
  };

  getproductData():void{
    this.productsService.getAllProducts().subscribe(
      {
        next:(res)=>{
          console.log(res.data)
          this.products.set(res.data);
        }
      }
    )
  };

  getAllcategoryData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories.set(res.data);
      }
    })
  };

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

  
isLoved(id: string): boolean {
  return this.whishlistData().some((item: any) => item._id === id);
}


toggleWishlist(id: string): void {
  const isAlreadyLoved = this.isLoved(id);
  if (isAlreadyLoved) {
    //delete it
    this.wishlistService.deleteProductFromWishlist(id).subscribe({
      next:(res) => {
        console.log(res)
        this.toastrService.error(res.message, 'Fresh Cart');
        this.wishlistService.lovedNumber.set(res.data.length)
        this.whishlistData.update(()=> res.data);
      },
      error:(err) =>{
        console.log(err)
      } 
    });
  } else {
    //add it
    this.wishlistService.addProductToWhishlist(id).subscribe({
      next:(res) => {
        if (res.status === 'success') {
          console.log(res)
          this.toastrService.success(res.message, 'Fresh Cart');
          this.wishlistService.lovedNumber.set(res.data.length)
          this.getwishlistData();
          console.log(res.data.length)
        }
      },
      error:(err) =>{
        console.log(err)
      }
    });
  }
}

getwishlistData():void{
    this.wishlistService.getLoggedUserWhishlist().subscribe({
      next:(res)=>{
        this.whishlistData.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
  
}
