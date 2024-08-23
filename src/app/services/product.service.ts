import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl:string = 'api/Product';

  constructor(@Inject('BASE_URL')private baseUrl:string, private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(`${this.baseUrl}/${this.productUrl}/get-all`)
  }

  plusSale(id:number, count:number){
    return this.http.put(`${this.baseUrl}/${this.productUrl}/update-sales?id=${id}&count=${count}`,null)
  }
}
