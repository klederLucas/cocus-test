export interface IGetBranchLastCommit {
  get: (
    owner: string,
    repository: string,
    branch: string,
  ) => Promise<string>;
}

