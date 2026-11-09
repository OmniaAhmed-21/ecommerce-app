import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [ReactiveFormsModule , CommonModule,TranslatePipe],
  selector: 'app-checkout',
  styleUrl: './checkout.component.scss',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);

  checkOutForm!:FormGroup;

  msgError:string = "";

  isLoading:boolean = false;

  cartId:WritableSignal<string> = signal('')

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }


  initForm():void{

    this.checkOutForm = this.formBuilder.group({
    details : [null , [Validators.required , Validators.minLength(3)] ],
    phone : [null , [Validators.required , Validators.pattern(/^01[012][0-9]{8}$/)] ],
    city : [null , [Validators.required , Validators.minLength(2) ] ],
  });

  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId.set(param.get('id')!);
      }
    })
  }

  sumbitForm():void{
    this.ordersService.checkOutPayment(this.cartId() , this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status === 'success'){
          open(res.session.url , '_self')
        }
      }
    })

  }

}
