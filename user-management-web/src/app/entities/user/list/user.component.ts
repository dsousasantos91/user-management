import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {IUser} from '../user.model';
import {RouterLink} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserDeleteDialogComponent} from '../delete/user-delete-dialog.component';
import {ITEM_DELETED_EVENT} from '../../../config/navigation.contants';
import {catchError, filter, finalize, of, Subject, takeUntil, tap} from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private destroy$ = new Subject<void>();
  users: IUser[] = []
  errorMessage = '';
  isLoading = false;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.load();
  }

  protected readonly menubar = menubar;

  trackByUser(index: number, user: any): number {
    return user.id;
  }

  load() {
    this.isLoading = true;

    this.userService.users().pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(err => {
        console.error('Erro ao carregar os usuários:', err);
        this.errorMessage = 'Erro ao carregar os usuários';
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.users = data;
    });
  }

  delete(user: IUser) {
    const modalRef = this.modalService.open(UserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }
}
