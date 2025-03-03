import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.tokenService.clear();
    this.router.navigate(['']);
  }

}
