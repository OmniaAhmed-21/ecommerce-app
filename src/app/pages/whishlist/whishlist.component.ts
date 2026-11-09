import { ToastrService } from 'ngx-toastr';
import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwhishlist } from '../../shared/interfaces/iwhishlist';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [RouterLink,TranslatePipe],
  selector: 'app-whishlist',
  styleUrl: './whishlist.component.scss',
  templateUrl: './whishlist.component.html',
})
export class WhishlistComponent implements OnInit{
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  
  whishlistData:WritableSignal<Iwhishlist[]> = signal([])

  ngOnInit(): void {
    this.getwishlistData();
  }

  getwishlistData():void{
    this.wishlistService.getLoggedUserWhishlist().subscribe({
      next:(res)=>{
        console.log(res)
        this.whishlistData.set(res.data)
        this.wishlistService.lovedNumber.set(res.data.length)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  removeItem(id:string):void{
    this.wishlistService.deleteProductFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastrService.error(res.message, 'Fresh Cart');
        this.whishlistData.update(()=> res.data);
        this.wishlistService.lovedNumber.set(res.data.length)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
}
