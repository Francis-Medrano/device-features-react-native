import { LocationAddress } from '../services/locationService';

export interface Entry {
  id: string;
  title: string;
  description: string;
  imageUri: string;
  address: LocationAddress | null;
  createdAt: string;
}
