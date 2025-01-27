import {Component, OnInit} from '@angular/core';
import {MyuserService} from '../service/myuser.service';
import {DatePipe, NgIf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {catchError, of, tap} from 'rxjs';
import {IMyUser} from '../myuser.model';

@Component({
  selector: 'app-myuser',
  standalone: true,
  templateUrl: './myuser-detail.component.html',
  imports: [
    DatePipe,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./myuser-detail.component.css']
})
export class MyuserDetailComponent implements OnInit {

  user: IMyUser | null = null;
  errorMessage: any;

  constructor(
    private userService: MyuserService
  ) { }

  ngOnInit(): void {
    this.userService.loggedUser().pipe(
      tap(data => {
        this.user = data;
      }),
      catchError(err => {
        this.errorMessage = 'Erro ao carregar os dados do usuário';
        console.error(err);
        return of(null);
      })
    ).subscribe();
  }

  previousState() {
    window.history.back();
  }
}
