import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProfile, NewProfile} from '../profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  resourceUrl = environment.resource_url;

  constructor(private httpClient: HttpClient) { }

  public profiles(): Observable<IProfile[]> {
    return this.httpClient.get<IProfile[]>(this.resourceUrl + 'profiles');
  }

  public getById(id: number): Observable<HttpResponse<IProfile>> {
    return this.httpClient.get<IProfile>(`${this.resourceUrl}profiles/${id}`, { observe: 'response' });
  }

  public update(profile: NewProfile): Observable<HttpResponse<IProfile>> {
    return this.httpClient.put<IProfile>(`${this.resourceUrl}profiles/${profile.id}`, profile, { observe: 'response' });
  }

  public create(profile: NewProfile): Observable<HttpResponse<IProfile>> {
    return this.httpClient.post<IProfile>(`${this.resourceUrl}profiles`, profile, { observe: 'response' });
  }

  public delete(id: number): Observable<HttpResponse<null>> {
    return this.httpClient.delete<null>(`${this.resourceUrl}profiles/${id}`, {observe: 'response'});
  }
}
