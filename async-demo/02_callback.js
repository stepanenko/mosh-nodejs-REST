
console.log('before');
getUser(1, (username) => {
  console.log(username);
  getRepos(username, (repos) => {
    console.log(repos);
    getCommits(repos[0], (commits) => {
      console.log(`Commits of ${repos[0]}: `, commits);
    });
  });
});
console.log('after');


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
