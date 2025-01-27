import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-authorized',
  standalone: true,
  template: `
    <div *ngIf="loading">Autenticando...</div>
    <div *ngIf="error">{{ errorMessage }}</div>
  `,
  imports: [
    NgIf
  ],
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {
  code = '';
  loading = false;
  error = false;
  errorMessage = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      this.code = data['code'];
      if (this.code) {
        this.getToken();
      } else {
        this.showError('Código de autorização não encontrado.');
        this.router.navigate(['/login']);
      }
    });
  }

  getToken(): void {
    this.loading = true;
    this.authService.getToken(this.code).subscribe(
      data => {
        this.tokenService.setTokens(data.access_token, data.refresh_token);
        this.loading = false;
        this.router.navigate(['/']);
      },
      err => {
        this.showError('Erro ao obter tokens.');
        console.error('Erro ao obter tokens:', err);
        this.router.navigate(['/login']);
      }
    );
  }

  private showError(message: string): void {
    this.error = true;
    this.errorMessage = message;
    this.loading = false;
  }
}
