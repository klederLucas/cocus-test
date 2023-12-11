import { Module } from '@nestjs/common';
import { GetUserRepositories } from './get-user-repositories';
import { GetRepositoryBranches } from './get-repository-branches';
import { GetBranchLastCommit } from './get-branch-last-commit';

@Module({
  providers: [GetUserRepositories, GetRepositoryBranches, GetBranchLastCommit],
  exports: [GetUserRepositories, GetRepositoryBranches, GetBranchLastCommit],
})
export class GithubModule {}
