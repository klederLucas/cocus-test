import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { GetBranchLastCommit } from '../get-branch-last-commit';
import { BadRequestException } from '../../../errors/badRequest.exception';

jest.mock('axios');

describe('GetBranchLastCommit', () => {
  let service: GetBranchLastCommit;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetBranchLastCommit],
    }).compile();

    service = module.get<GetBranchLastCommit>(GetBranchLastCommit);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get branch last commit', async () => {
    const owner = 'example';
    const repository = 'repo';
    const branch = 'main';

    const mockApiResponse = {
      data: {
        commit: {
          commit: {
            tree: {
              sha: 'mockSha',
            },
          },
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await service.get(owner, repository, branch);

    expect(result).toEqual('mockSha');

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        `/repos/${owner}/${repository}/branches/${branch}`,
      ),
    );
  });

  it('should throw BadRequestException if API call fails', async () => {
    const owner = 'example';
    const repository = 'repo';
    const branch = 'main';

    // Mocking the axios.get implementation to simulate an error
    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(service.get(owner, repository, branch)).rejects.toThrowError(
      BadRequestException,
    );
  });
});
