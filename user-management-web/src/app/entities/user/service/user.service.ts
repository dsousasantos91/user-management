import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, EMPTY, finalize, Observable} from 'rxjs';
import {IUser, NewUser} from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  resourceUrl = environment.resource_url;

  constructor(private httpClient: HttpClient) { }

  public users(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.resourceUrl + 'users');
  }

  public loggedUser(): Observable<IUser> {
    return this.httpClient.get<IUser>(this.resourceUrl + 'users/me');
  }

  public getById(id: number): Observable<HttpResponse<IUser>> {
    return this.httpClient.get<IUser>(`${this.resourceUrl}users/${id}`, { observe: 'response' });
  }

  public update(user: NewUser): Observable<HttpResponse<IUser>> {
    return this.httpClient.put<IUser>(`${this.resourceUrl}users/${user.id}`, user, { observe: 'response' });
  }

  public create(user: NewUser): Observable<HttpResponse<IUser>> {
    return this.httpClient.post<IUser>(`${this.resourceUrl}users`, user, { observe: 'response' });
  }

  public delete(id: number): Observable<HttpResponse<null>> {
    return this.httpClient.delete<null>(`${this.resourceUrl}users/${id}`, { observe: 'response' });
  }

  public changePassword(userId: Number, passwordChangeRequest: { newPassword: string }): Observable<any> {
    return this.httpClient.post(`${this.resourceUrl}users/change-password/${userId}`, passwordChangeRequest);
  }
}
