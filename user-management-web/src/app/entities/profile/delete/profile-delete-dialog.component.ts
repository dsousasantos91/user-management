import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfile } from '../profile.model';
import { ProfileService } from '../service/profile.service';
import { ITEM_DELETED_EVENT } from '../../../config/navigation.contants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-delete-dialog',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './profile-delete-dialog.component.html',
  styleUrl: './profile-delete-dialog.component.css'
})
export class ProfileDeleteDialogComponent {
  profile?: IProfile;

  protected profileService = inject(ProfileService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profileService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
