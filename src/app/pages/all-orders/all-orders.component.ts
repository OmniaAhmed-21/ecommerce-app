import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OrdersService } from '../../core/services/orders/orders.service';
import { jwtDecode } from 'jwt-decode'; 
import { IuserOrder } from '../../shared/interfaces/iuser-order';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly platformId = inject(PLATFORM_ID);

  userId:WritableSignal<string> = signal("");

  ordersList: WritableSignal<IuserOrder[]> = signal([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.userId.set(decodedToken.id);
        this.getUserOrderData();
      } else {
        console.log('No token found, please login first!');
      }
    }
  }

  getUserOrderData(): void { 

    console.log('Real User ID:', this.userId);
    
    this.ordersService.getUserOrder(this.userId()).subscribe({
      next: (res) => {
        console.log(res);
        this.ordersList.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  }

