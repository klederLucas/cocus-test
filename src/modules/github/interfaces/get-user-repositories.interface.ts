import { Repository } from '../entities/repository.entity';

export interface IGetUserRepositories {
  get: (userName: string) => Promise<GetUserRepositoriesResult>;
}

export type GetUserRepositoriesResult = Repository[];
