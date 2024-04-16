import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../../../core/constants/constant';

// @Injectable({
//   providedIn: 'root'
// })

// export class TokenService {
//   isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  
//   constructor() { 
//     const token = this.getToken()
//     if(token ) {
//       this.updateToken(true)
//     }
//   }

//   updateToken(status:boolean) {
//     this.isAuthentication.next(status)    
//   }

//   getToken() {
//     return localStorage?.getItem(constants.CURRENT_TOKEN) || null
//   }

//   setToken(token:string) {
//     localStorage?.setItem(constants.CURRENT_TOKEN, token)
//     this.updateToken(true)
//   }

//   removeToken() {
//     localStorage?.removeItem(constants.CURRENT_TOKEN)
//     this.updateToken(false)
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }

  getToken() {
    // Check if localStorage is available before using it
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(constants.CURRENT_TOKEN) || null;
    }
    return null;
  }

  setToken(token: string) {
    // Check if localStorage is available before using it
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(constants.CURRENT_TOKEN, token);
      this.updateToken(true);
    }
  }

  removeToken() {
    // Check if localStorage is available before using it
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(constants.CURRENT_TOKEN);
      this.updateToken(false);
    }
  }
}