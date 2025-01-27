import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser, NewUser} from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  fb: FormBuilder = new FormBuilder();

  constructor() { }

  createUserFormGroup(): FormGroup {
    return this.fb.group({
      id: [{ value: null, disabled: true }],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      profile: [null, [Validators.required]]
    });
  }

  getNewUser(editForm: FormGroup): NewUser {
    return {
      id: editForm.get('id')?.value || 0,
      name: editForm.get('name')?.value || '',
      email: editForm.get('email')?.value || '',
      profileId: editForm.get('profile')?.value || '',
    };
  }

  resetForm(form: FormGroup, user: IUser): void {
    form.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile?.id
    });
  }
}
