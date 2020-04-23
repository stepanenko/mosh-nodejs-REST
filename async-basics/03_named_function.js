
console.log('before');
getUser(1, displayUser);
console.log('after');

function displayUser(user) {
  console.log(user);
  getRepos(user.gitHubUsername, displayRepos);
}

function displayRepos(repos) {
  console.log(repos);
  getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}


function getUser(id, callback) {
  setTimeout(() => {
    console.log('Getting user from database:');
    callback({ id: id, gitHubUsername: 'Serhio'});
  }, 1000);
}

function getRepos(username, callback) {
  setTimeout(() => {
    console.log(`Getting repos of ${username}:`);
    callback(['repo1', 'repo2']);
  }, 1000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log(`Getting commits of ${repo}:`);
    callback(['commit1', 'commit2']);
  }, 1000);
}
