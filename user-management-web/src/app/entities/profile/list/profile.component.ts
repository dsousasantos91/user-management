import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {IProfile} from '../profile.model';
import {RouterLink} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileDeleteDialogComponent} from '../delete/profile-delete-dialog.component';
import {ITEM_DELETED_EVENT} from '../../../config/navigation.contants';
import {catchError, filter, finalize, of, Subject, takeUntil, tap} from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private destroy$ = new Subject<void>();
  profiles: IProfile[] = [];
  errorMessage = '';
  isLoading = false;

  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.load();
  }

  trackByProfile(index: number, profile: IProfile): number {
    return profile.id;
  }

  load() {
    this.isLoading = true;

    this.profileService.profiles().pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(err => {
        console.error('Erro ao carregar os perfis:', err);
        this.errorMessage = 'Erro ao carregar os perfis.';
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.profiles = data;
    });
  }

  delete(profile: IProfile) {
    const modalRef = this.modalService.open(ProfileDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profile = profile;
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }
}
