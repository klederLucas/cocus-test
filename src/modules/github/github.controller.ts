import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUserRepositoriesResult } from './interfaces/get-user-repositories.interface';
import { GetUserRepositories } from './get-user-repositories';

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  constructor(private readonly getUserRepositories: GetUserRepositories) {}

  @Get(':username/repositories')
  async getRepositories(
    @Param('username') username: string,
  ): Promise<GetUserRepositoriesResult> {
    return this.getUserRepositories.get(username);
  }
}
