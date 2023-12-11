import { Branch } from '../entities/branch.entity';

export interface IGetRepositoryBranches {
  get: (
    owner: string,
    repository: string,
  ) => Promise<GetRepositoryBranchesResult>;
}

export type GetRepositoryBranchesResult = Branch[];
