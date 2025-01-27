import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';
import {NgIf} from '@angular/common';
import {Subscription} from 'rxjs';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [
    NgIf,
    RouterLink
  ],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  authorize_uri = environment.authorize_uri;
  logout_url = environment.logout_url;
  authSubscription: Subscription = new Subscription();

  params: any = {
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: environment.scope,
    response_type: environment.response_type,
    response_mode: environment.response_mode,
    code_challenge_method: environment.code_challenge_method,
    code_challenge: environment.code_challenge,
  };

  userRoles: string[] = [];
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.authSubscription = this.tokenService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.userRoles = this.tokenService.getUserRoles();
    });
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  onLogin(): void {
    const httpParams = new HttpParams({ fromObject: this.params });
    location.href = this.authorize_uri + httpParams.toString();
  }

  onLogout(): void {
    localStorage.clear();
    location.href = this.logout_url;
  }
}
