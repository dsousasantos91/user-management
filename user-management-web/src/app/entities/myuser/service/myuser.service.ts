import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, EMPTY, finalize, Observable} from 'rxjs';
import {IMyUser, NewUser} from '../myuser.model';

@Injectable({
  providedIn: 'root'
})
export class MyuserService {

  resourceUrl = environment.resource_url;

  constructor(private httpClient: HttpClient) { }

  public loggedUser(): Observable<IMyUser> {
    return this.httpClient.get<IMyUser>(this.resourceUrl + 'myuser');
  }

  public update(user: NewUser): Observable<HttpResponse<IMyUser>> {
    return this.httpClient.put<IMyUser>(`${this.resourceUrl}myuser`, user, { observe: 'response' });
  }

  public changePassword(passwordChangeRequest: { newPassword: string; currentPassword: string }): Observable<any> {
    return this.httpClient.post(`${this.resourceUrl}myuser/change-password`, passwordChangeRequest);
  }
}
