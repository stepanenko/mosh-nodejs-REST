
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
user.then(n => console.log('User: ', n));
console.log('after');


function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading data from database...');
      resolve({ id: id, gitHubUsername: 'Serhio'});
    }, 1500);
  });
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


