
console.log('before');

// getUser(1)
//   .then(u => getRepos(u.gitHubUsername))
//   .then(r => getCommits(r[0]))
//   .then(c => console.log(c))
//   .catch(err => console.log('Error occured: ', err.message));

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepos(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  catch(err) {
    console.log('Error:', err.message);
  }
}

displayCommits();

console.log('after');

function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Reading data from database...');
      resolve({ id: id, gitHubUsername: 'Serhio'});
    }, 1000);
  });
}

function getRepos(username) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['repo1', 'repo2']);
    }, 1000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('smth went wrong'));
      // resolve(['commit1', 'commit2']);
    }, 1000);
  });
}
