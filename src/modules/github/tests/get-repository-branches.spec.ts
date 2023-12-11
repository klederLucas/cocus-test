import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { GetRepositoryBranches } from '../get-repository-branches';
import { GetBranchLastCommit } from '../get-branch-last-commit';
import { BadRequestException } from '../../../errors/badRequest.exception';

jest.mock('axios');

describe('GetRepositoryBranches', () => {
  let service: GetRepositoryBranches;
  let getBranchLastCommit: GetBranchLastCommit;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetRepositoryBranches, GetBranchLastCommit],
    }).compile();

    service = module.get<GetRepositoryBranches>(GetRepositoryBranches);
    getBranchLastCommit = module.get<GetBranchLastCommit>(GetBranchLastCommit);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get repository branches with last commit sha', async () => {
    const owner = 'example';
    const repository = 'repo';

    const mockBranchesApiResponse = [
      { name: 'main' },
      { name: 'feature-branch' },
    ];

    (axios.get as jest.Mock).mockResolvedValue({
      data: mockBranchesApiResponse,
    });

    jest.spyOn(getBranchLastCommit, 'get').mockResolvedValue('mockSha');

    const result = await service.get(owner, repository);

    expect(result).toEqual([
      { name: 'main', sha: 'mockSha' },
      { name: 'feature-branch', sha: 'mockSha' },
    ]);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/repos/${owner}/${repository}/branches`),
    );

    expect(getBranchLastCommit.get).toHaveBeenCalledTimes(
      mockBranchesApiResponse.length,
    );
    expect(getBranchLastCommit.get).toHaveBeenCalledWith(
      owner,
      repository,
      'main',
    );
    expect(getBranchLastCommit.get).toHaveBeenCalledWith(
      owner,
      repository,
      'feature-branch',
    );
  });

  it('should throw BadRequestException if API call fails', async () => {
    const owner = 'example';
    const repository = 'repo';

    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(service.get(owner, repository)).rejects.toThrowError(
      BadRequestException,
    );
  });
});
