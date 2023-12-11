export enum GitEndpoints {
  USER_REPOSITORIES = '/users/${userName}/repos',
  REPOSITORIES_BRANCHES = '/repos/${owner}/${repository}/branches',
  BRANCH_LAST_COMMIT = '/repos/${owner}/${repository}/branches/${branch}',
}
