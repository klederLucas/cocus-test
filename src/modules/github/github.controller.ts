import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUserRepositoriesResult } from './interfaces/get-user-repositories.interface';
import { GetUserRepositories } from './get-user-repositories';
import { AsciiValidationPipe } from '../../shared/pipes/ascii-validation.pipe';

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  constructor(private readonly getUserRepositories: GetUserRepositories) {}

  @Get(':username/repositories')
  async getRepositories(
    @Param('username', AsciiValidationPipe) username: string,
  ): Promise<GetUserRepositoriesResult> {
    return this.getUserRepositories.get(username);
  }
}
