
console.log('before');
getUser(1, getRep);
console.log('after');

function getRep(user) {
  getRepos(user, getCommits);
}

function getCommits(commits) {
  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}


function getUser(id, callback) {
  setTimeout(() => {
    console.log('Data from database');
    callback({ id: id, gitHubUsername: 'Serhio'});
  }, 500);
}

function getRepos(username, callback) {
  setTimeout(() => {
    callback(['repo1', 'repo2']);
  }, 1000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    callback(['commit1', 'commit2']);
  }, 1500);
}
