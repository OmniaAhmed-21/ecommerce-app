import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    constructor(private httpClient:HttpClient){}

    lovedNumber:WritableSignal<number> = signal(0)

    addProductToWhishlist(id:string):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
            {
                "productId": id
            },
        )
    }

    getLoggedUserWhishlist():Observable<any>{
        return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
    }

    deleteProductFromWishlist(id:string):Observable<any>{
        return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
    }
}
