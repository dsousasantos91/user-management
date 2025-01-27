import { IProfile } from '../profile/profile.model';

export interface IMyUser {
  id: number;
  name?: string | null;
  username?: string | null;
  document?: string | null;
  email?: string | null;
  active?: boolean | null;
  address?: string | null;
  phoneNumber?: string | null;
  profile?: IProfile | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type NewUser = Omit<IMyUser, 'id' | 'profile'> & {
  id: null;
  profileId?: number | null;
};
