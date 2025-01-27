import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProfile, NewProfile } from '../profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileFormService {
  fb: FormBuilder = new FormBuilder();

  constructor() { }

  createProfileFormGroup(): FormGroup {
    return this.fb.group({
      id: [{ value: null, disabled: true }],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  getNewProfile(editForm: FormGroup): NewProfile {
    return {
      id: editForm.get('id')?.value || 0,
      name: editForm.get('name')?.value || '',
    };
  }

  resetForm(form: FormGroup, profile: IProfile): void {
    form.patchValue({
      id: profile.id,
      name: profile.name,
    });
  }
}
