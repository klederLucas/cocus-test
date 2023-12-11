import { Injectable } from '@nestjs/common';
import {
  GetUserRepositoriesResult,
  IGetUserRepositories,
} from './interfaces/get-user-repositories.interface';
import axios from 'axios';
import { GetRepositoryBranches } from './get-repository-branches';
import { BadRequestException } from '../../errors/badRequest.exception';
import { GitEndpoints } from '../../shared/enums/git-endpoints';

@Injectable()
export class GetUserRepositories implements IGetUserRepositories {
  constructor(private readonly getRepositoryBranches: GetRepositoryBranches) {}

  async get(userName: string): Promise<GetUserRepositoriesResult> {
    let apiResponse;
    try {
      const apiEndpoint = process.env.GITHUB_API_ENDPOINT;
      const url = apiEndpoint + GitEndpoints.USER_REPOSITORIES
        .replace('${userName}', userName);

      apiResponse = await axios.get(url);
    } catch (error) {
      throw new BadRequestException(
        `Error during GitHub API call: ${error.message}`,
      );
    }

    const userRepositoryData: GetUserRepositoriesResult = [];
    for (const repository of apiResponse.data) {
      const repoName = repository.name;
      const repoBranches = await this.getRepositoryBranches.get(
        userName,
        repoName,
      );

      userRepositoryData.push({
        name: repoName,
        owner: repository.owner.login,
        branches: repoBranches,
      });
    }

    return userRepositoryData;
  }
}
