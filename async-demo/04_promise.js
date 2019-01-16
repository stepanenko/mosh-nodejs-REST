
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
const user = getUser(1)
user
  .then(u => getRepos(u.gitHubUsername))
  .then(r => getCommits(r[0]))
  .then(c => console.log(c));
console.log('after');


function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading data from database...');
      resolve({ id: id, gitHubUsername: 'Serhio'});
    }, 1500);
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
    }, 1500);
  });
}
