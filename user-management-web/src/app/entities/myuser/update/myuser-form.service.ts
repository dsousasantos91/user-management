import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IMyUser, NewUser} from '../myuser.model';
import {Subscription} from 'rxjs';
import {TokenService} from '../../../services/token.service';

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
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [{ value: '', disabled: !this.hasRole('ROLE_ADMIN') }, [Validators.required, Validators.email]],
      profile: [{ value: null, disabled: !this.hasRole('ROLE_ADMIN') }, [Validators.required]]
    });
  }

  getNewUser(editForm: FormGroup): NewUser {
    return {
      id: editForm.get('id')?.value || 0,
      name: editForm.get('name')?.value || '',
      email: editForm.get('email')?.value || '',
      profileId: editForm.get('profile')?.value || ''
    };
  }

  resetForm(form: FormGroup, user: IMyUser): void {
    form.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile?.id
    });
  }

  hasRole(role: string): boolean {
    console.log('hasRole', this.userRoles);
    return this.userRoles.includes(role);
  }
}
