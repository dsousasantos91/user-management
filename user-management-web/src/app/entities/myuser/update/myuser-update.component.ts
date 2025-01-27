import {Component, inject, OnInit} from '@angular/core';
import {IMyUser} from '../myuser.model';
import {MyuserService} from '../service/myuser.service';
import {RouterLink} from '@angular/router';
import {MyuserFormService} from './myuser-form.service';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {finalize, firstValueFrom, Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {ProfileService} from '../../profile/service/profile.service';
import {IProfile} from '../../profile/profile.model';

@Component({
  selector: 'app-myuser-update',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './myuser-update.component.html',
  styleUrl: './myuser-update.component.css'
})
export class MyuserUpdateComponent implements OnInit{

  isSaving = false;
  user: IMyUser | null = null;
  profiles: IProfile[] = [];

  protected userService = inject(MyuserService);
  protected profileService = inject(ProfileService);
  protected userFormService = inject(MyuserFormService);

  editForm: FormGroup = this.userFormService.createUserFormGroup();

  ngOnInit(): void {
    this.load()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  async load() {
    try {
      this.profiles = await firstValueFrom(this.profileService.profiles());
      this.user = await firstValueFrom(this.userService.loggedUser());
      console.log('Usuário encontrado', this.user);
      if (this.user) {
        this.updateForm(this.user);
      }
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  }


  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const user = this.userFormService.getNewUser(this.editForm);
    this.subscribeToSaveResponse(this.userService.update(user));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMyUser>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(user: IMyUser): void {
    this.user = user;
    this.userFormService.resetForm(this.editForm, user);
  }

  applyDocumentMask(event: any): void {
    let value = event.target.value;
    let documentValue = value.replace(/\D/g, '');
    if (documentValue.length > 11) {
      value = this.formatCNPJ(documentValue);
    } else {
      value = this.formatCPF(documentValue);
    }
    event.target.value = value;
    this.editForm.get('document')?.setValue(value);
  }

  applyPhoneMask(event: any): void {
    let value = event.target.value;
    let phoneValue = value.replace(/\D/g, '');
    if (phoneValue.length > 10) {
      value = this.formatPhoneMobile(phoneValue);
    } else {
      value = this.formatPhoneFixed(phoneValue);
    }
    event.target.value = value;
    this.editForm.get('phoneNumber')?.setValue(value);
  }

  formatCPF(value: string): string {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatCNPJ(value: string): string {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  formatPhoneFixed(value: string): string {
    return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  formatPhoneMobile(value: string): string {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
