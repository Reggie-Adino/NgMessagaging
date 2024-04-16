import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../models/common.module';
import { IUser } from '../../../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../../../core/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  loggedInUser():Observable<IApiResponse<IUser>> {
    return this.http.get<IApiResponse<IUser>>(`${apiEndpoint.AuthEndpoint.me}`)
  }

  getAllUsers(): Observable<IApiResponse<IUser[]>>{
    return this.http.get<IApiResponse<IUser[]>>(`$apiEndpoint.UserEndPoint`)
  }

}
