import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {catchError, finalize, of} from 'rxjs';
import {UserService} from '../service/user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isSaving = false;
  userId: number | null = null;

  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  changePasswordForm: FormGroup;
  showPassword = false;
  showNewPassword = false;

  constructor(private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
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
    if (this.userId) {
      const passwordChangeRequest = {
        newPassword: newPassword
      };

      this.userService.changePassword(this.userId, passwordChangeRequest)
        .pipe(
          finalize(() => this.onSaveFinalize()),
          catchError((err) => {
            console.error('Erro ao tentar mudar a senha:', err);
            this.onSaveError();
            return of(null);
          })
        )
        .subscribe({
          next: () => this.onSaveSuccess()
        });
    }
  }

  previousState(): void {
    console.log('retornando')
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }
}
