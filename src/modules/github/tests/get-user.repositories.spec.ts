import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { GetUserRepositories } from '../get-user-repositories';
import { GetRepositoryBranches } from '../get-repository-branches';
import { GetBranchLastCommit } from '../get-branch-last-commit';
import { BadRequestException } from '../../../errors/badRequest.exception';
import { GetRepositoryBranchesResult } from '../interfaces/get-repository-branches.interface';

jest.mock('axios');

describe('GetUserRepositories', () => {
  let service: GetUserRepositories;
  let getRepositoryBranches: GetRepositoryBranches;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserRepositories,
        GetRepositoryBranches,
        GetBranchLastCommit,
      ],
    }).compile();

    service = module.get<GetUserRepositories>(GetUserRepositories);
    getRepositoryBranches = module.get<GetRepositoryBranches>(
      GetRepositoryBranches,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get user repositories with branches', async () => {
    const userName = 'example';

    const mockRepositoriesApiResponse = [
      {
        name: 'repo1',
        owner: { login: 'example' },
      },
      {
        name: 'repo2',
        owner: { login: 'example' },
      },
    ];

    (axios.get as jest.Mock).mockResolvedValue({
      data: mockRepositoriesApiResponse,
    });

    const repositoriesMockResult: GetRepositoryBranchesResult = [];
    repositoriesMockResult.push({
      name: 'repo1',
      sha: '27ba2f31f0d1971837cf18486ababda45cdfbed8',
    });
    repositoriesMockResult.push({
      name: 'repo2',
      sha: 'fe06921f60e4fbec276015c5cdb662c3998ab897',
    });

    jest
      .spyOn(getRepositoryBranches, 'get')
      .mockResolvedValue(repositoriesMockResult);

    const result = await service.get(userName);

    expect(result).toEqual([
      {
        name: 'repo1',
        owner: 'example',
        branches: repositoriesMockResult,
      },
      {
        name: 'repo2',
        owner: 'example',
        branches: repositoriesMockResult,
      },
    ]);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/users/${userName}/repos`),
    );

    expect(getRepositoryBranches.get).toHaveBeenCalledTimes(
      mockRepositoriesApiResponse.length,
    );
    expect(getRepositoryBranches.get).toHaveBeenCalledWith(userName, 'repo1');
    expect(getRepositoryBranches.get).toHaveBeenCalledWith(userName, 'repo2');
  });

  it('should throw BadRequestException if API call fails', async () => {
    const userName = 'example';

    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(service.get(userName)).rejects.toThrowError(
      BadRequestException,
    );
  });
});
