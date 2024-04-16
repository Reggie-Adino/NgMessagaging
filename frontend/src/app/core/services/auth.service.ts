import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../../../models/auth.model';
import { apiEndpoint } from '../../../core/constants/constant';
import { TokenService } from './token.service';
import { map } from 'rxjs';
import { resolve } from 'node:path';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(private http:HttpClient, private tokensrv:TokenService) { 

  }

  login(data: ILogin) {
    return this.http.post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data).pipe(
      map(response => {
        if (response && response.data.token) {
          this.tokensrv.setToken(response.data.token);
        }
        return response; // Return the response after setting the token
      })
    );
  }
  
 
  logout() {
    return this.http.get(`${apiEndpoint.AuthEndpoint.logout}`).pipe(map((response) => {
      if(response) {
        this.tokensrv.removeToken();
      }
      return response
    }))
  }
}
