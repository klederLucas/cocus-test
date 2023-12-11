import { Branch } from './branch.entity';

export interface Repository {
  name: string;
  owner: string;
  branches: Branch[];
}
