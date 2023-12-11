import { Injectable } from '@nestjs/common';
import { IGetBranchLastCommit } from './interfaces/get-branch-last-commit.interface';
import axios from 'axios';
import { GitEndpointsEnum } from '../../shared/enums/git-endpoints.enum';
import configuration from '../../shared/configuration';
import { BadRequestException } from '../../shared/errors/bad-request.exception';

@Injectable()
export class GetBranchLastCommit implements IGetBranchLastCommit {
  constructor() {}

  async get(
    owner: string,
    repository: string,
    branch: string,
  ): Promise<string> {
    const apiEndpoint = configuration().git_api;
    const url =
      apiEndpoint +
      GitEndpointsEnum.BRANCH_LAST_COMMIT.replace('${owner}', owner)
        .replace('${repository}', repository)
        .replace('${branch}', branch);

    let apiResponse;
    try {
      apiResponse = await axios.get(url);
    } catch (error) {
      throw new BadRequestException(
        `Error during GitHub API call: ${error.message}`,
      );
    }

    return apiResponse.data.commit.commit.tree.sha;
  }
}
