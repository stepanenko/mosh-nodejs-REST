
console.log('before');
const user = getUser(1);
console.log(user); // undefined
console.log('after');


function getUser(id) {
  setTimeout(() => {
    console.log('Data from database');
    return { id: id, gitHubUsername: 'Serhio'}
  }, 2000);
}
