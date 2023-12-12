import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GetUserRepositories } from './get-user-repositories';
import { GetRepositoryBranches } from './get-repository-branches';
import { GetBranchLastCommit } from './get-branch-last-commit';
import { JsonCheckMiddleware } from '../../middlewares/json-check.middleware';

@Module({
  providers: [GetUserRepositories, GetRepositoryBranches, GetBranchLastCommit],
  exports: [GetUserRepositories, GetRepositoryBranches, GetBranchLastCommit],
})
export class GithubModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(JsonCheckMiddleware).forRoutes('*');
  }
}
