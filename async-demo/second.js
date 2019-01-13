
console.log('before');
getUser(1, (user) => {
  console.log('User:', user);

  getRepos(user, (repos) => {
    console.log(`${user.gitHubUsername}'s repos:`, repos);
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
