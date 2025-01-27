export interface IProfile {
  id: number;
  name?: string | null;
  createdAt?: string | null;
}

export type NewProfile = Omit<IProfile, 'id'> & { id: null };
