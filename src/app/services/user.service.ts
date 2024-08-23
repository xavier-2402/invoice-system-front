import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject('BASE_URL')private baseUrl:string, private http:HttpClient) { }

  userUrl:string = 'api/user'
  getAllUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}/${this.userUrl}/get-all`)
  }
}
