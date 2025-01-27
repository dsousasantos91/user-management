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
      name: ['', [Validators.required, Validators.maxLength(100)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      document: ['', [Validators.required, Validators.pattern('(^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$)|(^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$)')]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      active: [true, [Validators.required]],
      address: ['', [Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.pattern('^\\(\\d{2}\\) \\d{4,5}-\\d{4}$')]],
      profileId: [null, [Validators.required]],
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

}
