import { Icart } from '../../shared/interfaces/icart';
import { CartService } from './../../core/services/cart.service';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  imports: [RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.scss',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  cartDetails:Icart = {} as Icart;

  ngOnInit(): void {
    this.getCartData();
  };

  getCartData():void{
    this.cartService.getLoggedUser().subscribe({
      next:(res)=>{
        console.log(res.data);  //totalPrice , products
        this.cartDetails = res.data ;
        this.changeDetectorRef.detectChanges();
      }
    })
  };

  removeItem(id:string):void{
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
  }).then((result) => {
  if (result.isConfirmed){

    this.cartService.removeSpecificCart(id).subscribe({
      next:(res)=>{
        console.log(res.numOfCartItems)
        this.cartDetails = res.data ;
        this.cartService.cartNumber.set(res.numOfCartItems);
        Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
        });
        this.changeDetectorRef.detectChanges();
      } 
    })
  } 
});
  }

  updateCount(id:string , count:number):void{
    this.cartService.updateProductQuantity(id , count).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails = res.data ;
        this.changeDetectorRef.detectChanges();
      }
    })
  }

  clearItem(){
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed){
      this.cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res)
        if( res.message == 'success'){
          this.cartService.cartNumber.set(0);
          Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
          });
        this.cartDetails = {} as Icart ;
        this.changeDetectorRef.detectChanges();
        }   
      }
    })
    }  
    });
}

}
