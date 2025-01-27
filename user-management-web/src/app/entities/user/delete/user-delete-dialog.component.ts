import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {IUser} from '../user.model';
import {UserService} from '../service/user.service';
import {ITEM_DELETED_EVENT} from '../../../config/navigation.contants';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-delete-dialog',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-delete-dialog.component.html',
  styleUrl: './profile-delete-dialog.component.css'
})
export class UserDeleteDialogComponent {
  user?: IUser;

  protected userService = inject(UserService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
