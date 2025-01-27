import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {DatePipe, NgIf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {catchError, of, tap} from 'rxjs';
import {IUser} from '../user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user-detail.component.html',
  imports: [
    DatePipe,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: IUser | null = null;
  errorMessage: any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getById(Number(userId)).subscribe({
        next: (response) => {
          this.user = response.body;
          console.log('Usuário encontrado', this.user);
        },
        error: (err) => {
          console.error('Erro ao carregar o usuário:', err);
        }
      });
      return;
    }

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
