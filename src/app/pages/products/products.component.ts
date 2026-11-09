import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwhishlist } from '../../shared/interfaces/iwhishlist';

@Component({
  imports: [TranslatePipe, RouterLink],
  selector: 'app-products',
  styleUrl: './products.component.scss',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit{
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  products:WritableSignal<Iproduct[]> = signal([])

  whishlistData:WritableSignal<Iwhishlist[]> = signal([])

  ngOnInit(): void {
    this.getproductData();
    this.getwishlistData();
  }
  
  getproductData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products.set(res.data)
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
