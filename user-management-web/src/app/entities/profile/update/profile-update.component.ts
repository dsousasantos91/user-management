import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileFormService} from './profile-form.service';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {finalize, firstValueFrom, Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {NgIf} from '@angular/common';
import {IProfile} from '../profile.model';
import {ProfileService} from '../service/profile.service';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './profile-update.component.html',
  styleUrl: './myprofile-update.component.css'
})
export class ProfileUpdateComponent implements OnInit {

  isSaving = false;
  profile: IProfile | null = null;
  profiles: IProfile[] = [];

  protected profileService = inject(ProfileService);
  protected profileFormService = inject(ProfileFormService);
  protected activatedRoute = inject(ActivatedRoute);

  editForm: FormGroup = this.profileFormService.createProfileFormGroup();

  ngOnInit(): void {
    this.load()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  async load() {
    try {
      this.profiles = await firstValueFrom(this.profileService.profiles());
      const profileId = this.activatedRoute.snapshot.paramMap.get('id');
      if (profileId) {
        const response = await firstValueFrom(this.profileService.getById(Number(profileId)));
        this.profile = response.body;
        console.log('Perfil encontrado', this.profile);
        if (this.profile) {
          this.updateForm(this.profile);
        }
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
    const profile = this.profileFormService.getNewProfile(this.editForm);
    console.log('Profile', profile)
    if (profile.id) {
      this.subscribeToSaveResponse(this.profileService.update(profile));
    } else {
      this.subscribeToSaveResponse(this.profileService.create(profile));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfile>>): void {
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

  protected updateForm(profile: IProfile): void {
    this.profile = profile;
    this.profileFormService.resetForm(this.editForm, profile);
  }
}
