
let p = new Promise((resolve, reject) => {
  // some async work
  setTimeout(() => {
    // resolve(1);
    reject(new Error('database is not responding'));
  }, 1000);
});

p
  .then(console.log)
  .catch(err => console.log('Error:', err.message));
