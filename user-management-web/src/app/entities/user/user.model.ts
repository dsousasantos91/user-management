import {IProfile} from '../profile/profile.model';

export interface IUser {
  id: number;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  profile?: IProfile | null;
  createdAt?: string | null;
}

export type NewUser = Omit<IUser, 'id' | 'profile'> & { id: null; profileId?: number | null };
