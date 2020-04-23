
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

  // ==== Promise API ====
Promise.resolve(1)
  .then(result => console.log(result));
Promise.reject(new Error('Reason for rejection...'))
  .catch(err => console.log(err));

// === Parallel Promises ===
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 1')
    resolve('one');
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 2')
    resolve('two');
  }, 1000);
  // reject(new Error('smth went wrong'));
});

Promise.all([p1, p2])
  .then(result => console.log('"All" result:', result))
  .catch(err => console.log('Error:', err.message));

Promise.race([p1, p2])
  .then(result => console.log('"Race" result:', result))
  .catch(err => console.log('Error:', err.message));

// === Stackoverflow Examples ===
// https://stackoverflow.com/questions/33073509/promise-all-then-resolve

const promises = [
  new Promise(resolve => setTimeout(resolve, 0, 1)),
  new Promise(resolve => setTimeout(resolve, 0, 2))
];

Promise.all(promises)
  .then(data => {
    console.log('First handler', data);
    return data.map(entry => entry * 10);
  })
  .then(data => {
    console.log('Second handler', data);
  });
// (catch handler omitted for brevity. In production code, always either propagate the promise, or handle rejection.)
// ...because the first handler gets the resolution of the two promises (1 and 2) as an array, and then creates a new array with each of those multiplied by 10 and returns it. The second handler gets what the first handler returned.

// If the additional work you're doing is synchronous, you can also put it in the first handler:
Promise.all(promises)
  .then(data => {
    console.log("Initial data", data);
    data = data.map(entry => entry * 10);
    console.log("Updated data", data);
    return data;
  });
