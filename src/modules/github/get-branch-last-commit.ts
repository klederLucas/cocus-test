import { Injectable } from '@nestjs/common';
import { IGetBranchLastCommit } from './interfaces/get-branch-last-commit.interface';
import axios from 'axios';
import { GitEndpoints } from '../../shared/enums/git-endpoints';
import configuration from '../../shared/configuration';

@Injectable()
export class GetBranchLastCommit implements IGetBranchLastCommit {
  constructor() {}

  async get(
    owner: string,
    repository: string,
    branch: string,
  ): Promise<string> {
    const apiEndpoint = configuration().git_api;
    const url = apiEndpoint + GitEndpoints.BRANCH_LAST_COMMIT
      .replace('${owner}', owner)
      .replace('${repository}', repository)
      .replace('${branch}', branch);

    const apiResponse = await axios.get(url);

    return apiResponse.data.commit.commit.tree.sha;
  }
}
