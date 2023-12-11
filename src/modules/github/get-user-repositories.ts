import { Injectable } from '@nestjs/common';
import {
  GetUserRepositoriesResult,
  IGetUserRepositories,
} from './interfaces/get-user-repositories.interface';
import axios from 'axios';
import { GetRepositoryBranches } from './get-repository-branches';
import { BadRequestException } from '../../shared/errors/bad-request.exception';
import { GitEndpointsEnum } from '../../shared/enums/git-endpoints.enum';
import configuration from '../../shared/configuration';
import { NotFoundException } from '../../shared/errors/not-found.exception';

@Injectable()
export class GetUserRepositories implements IGetUserRepositories {
  constructor(private readonly getRepositoryBranches: GetRepositoryBranches) {}

  async get(userName: string): Promise<GetUserRepositoriesResult> {
    let apiResponse;
    try {
      const apiEndpoint = configuration().git_api;
      const url =
        apiEndpoint +
        GitEndpointsEnum.USER_REPOSITORIES.replace('${userName}', userName);

      apiResponse = await axios.get(url);
    } catch (error) {
      if (error.response.status === 400) {
        throw new BadRequestException(
          `Error during GitHub API call: ${error.message}`,
        );
      } else if (error.response.status === 404) {
        throw new NotFoundException(`User ${userName} not found.`);
      } else {
        throw new Error(error.message);
      }
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
