import { AuthService } from './../../core/services/auth/auth.service';
import { Component, input, OnInit, inject, computed, signal, Signal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  imports: [RouterLink , RouterLinkActive,TranslatePipe],
  selector: 'app-navbar',
  styleUrl: './navbar.component.scss',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  readonly AuthService = inject(AuthService)
  readonly myTranslateService = inject(MyTranslateService)
  private readonly cartService = inject(CartService)
  private readonly wishlistService = inject(WishlistService)


  isLogin = input<boolean>(false);

  countCart:Signal<number> = computed( ()=>this.cartService.cartNumber());

  countLoved:Signal<number> = computed(()=>this.wishlistService.lovedNumber())

  constructor(private flowbiteService: FlowbiteService) {}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (localStorage.getItem('userToken')) {
      this.loadUserData();
    }
  }

  loadUserData(): void {
    this.cartService.getLoggedUser().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    });

    this.wishlistService.getLoggedUserWhishlist().subscribe({
      next:(res)=>{
        this.wishlistService.lovedNumber.set(res.data.length)
      }
    })
    
  }


  changeLang(lang:string):void{
    this.myTranslateService.changeLangTranslate(lang)
  }

}
