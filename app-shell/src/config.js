

const config = {

  project_uuid: '269f2285-2652-4f98-b8cc-99ba6e0a48ca',
  flHost: process.env.NODE_ENV === 'production' ? 'https://flatlogic.com/projects' : 'http://localhost:3000/projects',

    gitea_domain: process.env.GITEA_DOMAIN || 'gitea.flatlogic.app',
    gitea_username: process.env.GITEA_USERNAME || 'admin',
    gitea_api_token: process.env.GITEA_API_TOKEN || null,
    github_repo_url: process.env.GITHUB_REPO_URL || null,
    github_token: process.env.GITHUB_TOKEN || null,
};

module.exports = config;
