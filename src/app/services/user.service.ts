import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject('BASE_URL')private baseUrl:string, private http:HttpClient) { }

  userUrl:string = 'api/user';


  getAllUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}/${this.userUrl}/get-all`)
  }

  addUser(user:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/${this.userUrl}/add`,user)
  }

  updateUser(user:User):Observable<any>{
    return this.http.put(`${this.baseUrl}/${this.userUrl}/update?id=${user.userId}`,user)
  }

  deleteUser(userId:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${this.userUrl}/delete?id=${userId}`);
  }

}
