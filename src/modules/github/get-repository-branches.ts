import { Injectable } from '@nestjs/common';
import {
  GetRepositoryBranchesResult,
  IGetRepositoryBranches,
} from './interfaces/get-repository-branches.interface';
import axios from 'axios';
import { GetBranchLastCommit } from './get-branch-last-commit';
import { BadRequestException } from '../../shared/errors/bad-request.exception';
import { GitEndpointsEnum } from '../../shared/enums/git-endpoints.enum';
import configuration from '../../shared/configuration';

@Injectable()
export class GetRepositoryBranches implements IGetRepositoryBranches {
  constructor(private readonly getBranchLastCommit: GetBranchLastCommit) {}

  async get(
    owner: string,
    repository: string,
  ): Promise<GetRepositoryBranchesResult> {
    let apiResponse;
    try {
      const apiEndpoint = configuration().git_api;
      const url =
        apiEndpoint +
        GitEndpointsEnum.REPOSITORIES_BRANCHES
          .replace( '${owner}',owner)
          .replace('${repository}', repository);

      apiResponse = await axios.get(url);
    } catch (error) {
      throw new BadRequestException(
        `Error during GitHub API call: ${error.message}`,
      );
    }

    const branchData: GetRepositoryBranchesResult = [];
    for (const branch of apiResponse.data) {
      const branchName: string = branch.name;
      const lastCommitSha = await this.getBranchLastCommit.get(
        owner,
        repository,
        branchName,
      );

      branchData.push({
        name: branchName,
        sha: lastCommitSha,
      });
    }

    return branchData;
  }
}
