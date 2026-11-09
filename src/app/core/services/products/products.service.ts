import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

     constructor( private httpclient:HttpClient){}

     getAllProducts():Observable<any>{
          return this.httpclient.get(`${environment.baseUrl}/api/v1/products`)
     }
     
     getSpecificProducts(id:string | null):Observable<any>{
          return this.httpclient.get(`${environment.baseUrl}/api/v1/products/${id}`)
     }
}
