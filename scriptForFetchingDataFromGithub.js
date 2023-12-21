class GitHubAPI {
  constructor(token, username) {
    this.token = token;
    this.username = username;
    this.baseURL = "https://api.github.com";
  }

  async getRepos() {
    try {
      const response = await fetch(
        `${this.baseURL}/users/${this.username}/repos`,
        {
          headers: {
            Authorization: `token ${this.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }
}

const token = "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";
const username = prompt("Enter your user name", "please enter your user name");
const githubAPI = new GitHubAPI(token, username);

githubAPI
  .getRepos()
  .then((repos) => {
    console.log("Repositories:", repos);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
