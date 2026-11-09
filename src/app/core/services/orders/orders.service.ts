import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
    constructor(private httpClient:HttpClient){}

    checkOutPayment(id:string , data:object):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
            {
                "shippingAddress":data
            }
        )
    }

    getUserOrder(id:string):Observable<any>{
        return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
    }
}
