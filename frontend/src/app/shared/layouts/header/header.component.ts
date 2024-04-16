import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isAuthenticate$!: Observable<boolean> 
  
  constructor(private authSrv:AuthService, private tokenSrv:TokenService) {
    this.isAuthenticate$ = this.tokenSrv.isAuthentication;
  }

  logout() {
    this.authSrv.logout().subscribe({next() {},})
  }

}
