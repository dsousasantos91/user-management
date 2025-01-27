import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {finalize} from 'rxjs';
import {MyuserService} from '../service/myuser.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-myyser-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './myuser-change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class MyuserChangePasswordComponent implements OnInit {

  isSaving = false;
  userId: number | null = null;

  protected userService = inject(MyuserService);
  protected activatedRoute = inject(ActivatedRoute);

  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadUserId();
  }

  loadUserId(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (userId) {
      this.userId = Number(userId);
    }
  }

  save(): void {
    if (this.changePasswordForm.valid && this.isPasswordMatch()) {
      this.isSaving = true;
      const { currentPassword, newPassword } = this.changePasswordForm.value;
      this.changePassword(currentPassword, newPassword);
    } else {
      console.error("Form is invalid or passwords don't match.");
    }
  }

  isPasswordMatch(): boolean {
    const { newPassword, confirmPassword } = this.changePasswordForm.value;
    return newPassword === confirmPassword;
  }

  changePassword(currentPassword: string, newPassword: string): void {
    const passwordChangeRequest = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    this.userService.changePassword(passwordChangeRequest)
      .pipe(finalize(() => {
        this.onSaveFinalize();
        this.previousState();
      }))
      .subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
  }

  previousState(): void {
    window.history.back();
  }

  onSaveSuccess(): void {
    this.previousState();
  }

  onSaveError(): void {
    console.error('Erro ao alterar a senha.');
  }

  onSaveFinalize(): void {
    this.isSaving = false;
  }
}
