async function getRepoStats(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return {
      name: data.full_name,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      description: data.description,
      url: data.html_url
    };
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
}

module.exports = { getRepoStats };