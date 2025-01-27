import {IProfile} from '../profile/profile.model';

export interface IMyUser {
  id: number;
  name?: string | null;
  email?: string | null;
  profile?: IProfile | null;
  createdAt?: string | null;
}

export type NewUser = Omit<IMyUser, 'id' | 'password' | 'profile'> & { id: null; password?: null ; profileId?: number | null };
