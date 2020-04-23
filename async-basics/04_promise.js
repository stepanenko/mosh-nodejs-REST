
console.log('before');
// getUser(1, (username) => {
//   console.log(username);
//   getRepos(username, (repos) => {
//     console.log(repos);
//     getCommits(repos[0], (commits) => {
//       console.log(`Commits of ${repos[0]}: `, commits);
//     });
//   });
// });
getUser(1)
  .then(u => getRepos(u.gitHubUsername))
  .then(r => getCommits(r[0]))
  .then(c => console.log(c))
  .catch(err => console.log('Error occured: ', err.message));

console.log('after');


function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading data from database...');
      resolve({ id: id, gitHubUsername: 'Serhio'});
    }, 1000);
  });
}


function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['repo1', 'repo2']);
    }, 1000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['commit1', 'commit2']);
    }, 1000);
  });
}
