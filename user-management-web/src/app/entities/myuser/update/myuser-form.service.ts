import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IMyUser, NewUser} from '../myuser.model';
import {Subscription} from 'rxjs';
import {TokenService} from '../../../services/token.service';
import {IUser} from '../../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class MyuserFormService {
  fb: FormBuilder = new FormBuilder();
  userRoles: string[] = [];
  authSubscription: Subscription = new Subscription();

  constructor(private tokenService: TokenService) {
    this.authSubscription = this.tokenService.loggedIn$.subscribe(loggedIn => {
      this.userRoles = this.tokenService.getUserRoles();
    });
  }

  createUserFormGroup(): FormGroup {
    return this.fb.group({
      id: [{ value: null, disabled: true }],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      document: [{ value: '', disabled: !this.hasRole('ROLE_ADMIN') }, [Validators.required, Validators.pattern('(^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$)|(^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$)')]],
      email: [{ value: '', disabled: !this.hasRole('ROLE_ADMIN') }, [Validators.required, Validators.email, Validators.maxLength(100)]],
      active: [{ value: true, disabled: !this.hasRole('ROLE_ADMIN') }, [Validators.required]],
      address: ['', [Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.pattern('^\\(\\d{2}\\) \\d{4,5}-\\d{4}$')]],
      profileId: [{ value: null, disabled: !this.hasRole('ROLE_ADMIN') }, [Validators.required]],
    });
  }

  getNewUser(editForm: FormGroup): NewUser {
    return {
      id: editForm.get('id')?.value || 0,
      name: editForm.get('name')?.value || '',
      username: editForm.get('username')?.value || '',
      document: editForm.get('document')?.value || '',
      email: editForm.get('email')?.value || '',
      active: editForm.get('active')?.value,
      address: editForm.get('address')?.value || '',
      phoneNumber: editForm.get('phoneNumber')?.value || '',
      profileId: editForm.get('profileId')?.value || 0,
    };
  }


  resetForm(form: FormGroup, user: IUser): void {
    form.patchValue({
      id: user.id,
      name: user.name,
      username: user.username,
      document: user.document,
      email: user.email,
      active: user.active,
      address: user.address,
      phoneNumber: user.phoneNumber,
      profileId: user.profile?.id,
    });
  }

  hasRole(role: string): boolean {
    console.log('hasRole', this.userRoles);
    return this.userRoles.includes(role);
  }
}
